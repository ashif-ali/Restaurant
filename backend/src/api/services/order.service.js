
const Order = require('../models/order.model');
const Client = require('../models/client.model');
const Chef = require('../models/chef.model');
const MenuItem = require('../models/menuItem');
const Table = require('../models/table.model');

/**
 * Creates a new order by orchestrating several steps:
 * 1. Find or create a client.
 * 2. Validate menu items and calculate total amount.
 * 3. Calculate the estimated completion time.
 * 4. Assign the least busy chef.
 * 5. Generate a unique order ID.
 * 6. Reserve a table if it's a Dine-In order.
 * 7. Create and save the final order.
 */
const createOrder = async (orderData) => {
    const { clientInfo, items, orderType, cookingInstructions, tableId } = orderData;

    // --- 1. Find or Create Client ---
    let client = await Client.findOne({ phoneNumber: clientInfo.phoneNumber });
    if (!client) {
        client = new Client(clientInfo);
        await client.save();
    }

    // --- 2. Validate Items & Calculate Total ---
    let totalAmount = 0;
    let maxPrepTime = 0;
    const itemsWithDetails = [];

    for (const item of items) {
        const menuItem = await MenuItem.findById(item.menuItem);
        if (!menuItem) {
            throw new Error(`Menu item with ID ${item.menuItem} not found.`);
        }
        totalAmount += menuItem.price * item.quantity;
        if (menuItem.averagePreparationTime > maxPrepTime) {
            maxPrepTime = menuItem.averagePreparationTime;
        }
        itemsWithDetails.push({
            menuItem: menuItem._id,
            quantity: item.quantity,
            priceAtOrder: menuItem.price,
        });
    }

    // --- 3. Calculate Estimated Completion Time ---
    const estimatedCompletionTime = new Date();
    estimatedCompletionTime.setMinutes(estimatedCompletionTime.getMinutes() + maxPrepTime);

    // --- 4. Assign Least Busy Chef ---
    // This is a simplified logic. A real-world scenario would be more complex.
    const chefs = await Chef.find();
    if (chefs.length === 0) throw new Error('No chefs available.');

    // Find how many 'Processing' orders each chef has.
    const orders = await Order.find({ status: 'Processing' });
    const chefOrderCounts = chefs.map(chef => ({
        chefId: chef._id,
        count: orders.filter(order => order.chef && order.chef.equals(chef._id)).length,
    }));

    chefOrderCounts.sort((a, b) => a.count - b.count);
    const assignedChef = chefOrderCounts[0].chefId;

    // --- 5. Generate Unique Order ID ---
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    const newOrderId = lastOrder ? parseInt(lastOrder.orderId.substring(1)) + 1 : 101;
    const orderId = `#${newOrderId}`;

    // --- 6. Prepare Final Order Object ---
    const newOrderData = {
        orderId,
        orderType,
        status: 'Processing',
        items: itemsWithDetails,
        totalAmount,
        cookingInstructions,
        client: client._id,
        chef: assignedChef,
        estimatedCompletionTime,
    };

    // --- 7. Handle Table Reservation for Dine-In ---
    if (orderType === 'Dine-In') {
        if (!tableId) throw new Error('Table ID is required for Dine-In orders.');
        const table = await Table.findById(tableId);
        if (!table || table.status === 'Reserved') {
            throw new Error('Table is not available.');
        }
        table.status = 'Reserved';
        await table.save();
        newOrderData.table = table._id;
    }

    const newOrder = new Order(newOrderData);
    return await newOrder.save();
};


/**
 * Retrieves all orders and populates related data for display.
 */
const getAllOrders = async () => {
    return await Order.find()
        .sort({ createdAt: -1 })
        .populate('client', 'name phoneNumber') // Get client's name and phone
        .populate('chef', 'name')               // Get chef's name
        .populate('table', 'tableNumber')       // Get table number
        .populate('items.menuItem', 'name');    // Get the name of each menu item
};

// const getAllOrders = async () => {
//     console.log("Attempting to fetch all orders (simple query)...");
//     const orders = await Order.find().sort({ createdAt: -1 });
//     console.log(`Successfully fetched ${orders.length} orders.`);
//     return orders;
// };

/**
 * Updates the status of a specific order.
 */
const updateOrderStatus = async (id, status) => {
    const order = await Order.findById(id);
    if (!order) {
        throw new Error('Order not found');
    }

    // If order is completed, free up the table
    if (order.orderType === 'Dine-In' && (status === 'Served' || status === 'Cancelled')) {
        await Table.findByIdAndUpdate(order.table, { status: 'Available' });
    }

    order.status = status;
    return await order.save();
};
const placeOrder = async (orderPayload) => {
    const { clientInfo, items: cartItems, orderType, numPersons } = orderPayload;

    //  1. Find or Create Client (same as before) 
    let client = await Client.findOne({ phoneNumber: clientInfo.phoneNumber });
    if (!client) {
        client = new Client(clientInfo);
        await client.save();
    }

    //  2. Validate Items & Calculate Totals (same as before) 
    let totalAmount = 0;
    let maxPrepTime = 0;
    const itemsWithDetails = [];
    const itemIds = cartItems.map(item => item.id);
    const menuItems = await MenuItem.find({ '_id': { $in: itemIds } });

    for (const cartItem of cartItems) {
        const menuItem = menuItems.find(mi => mi._id.toString() === cartItem.id);
        if (!menuItem) throw new Error(`Menu item with ID ${cartItem.id} not found.`);

        totalAmount += menuItem.price * cartItem.quantity;
        if (menuItem.averagePreparationTime > maxPrepTime) {
            maxPrepTime = menuItem.averagePreparationTime;
        }
        itemsWithDetails.push({
            menuItem: menuItem._id,
            quantity: cartItem.quantity,
            priceAtOrder: menuItem.price,
        });
    }

    const estimatedCompletionTime = new Date();
    estimatedCompletionTime.setMinutes(estimatedCompletionTime.getMinutes() + maxPrepTime);

    //  3. Assign Least Busy Chef (same as before) 
    const chefs = await Chef.find();
    if (chefs.length === 0) throw new Error('No chefs available.');
    const orders = await Order.find({ status: 'Processing' });
    const chefOrderCounts = chefs.map(chef => ({
        chefId: chef._id,
        count: orders.filter(order => order.chef && order.chef.equals(chef._id)).length,
    }));
    chefOrderCounts.sort((a, b) => a.count - b.count);
    const assignedChef = chefOrderCounts[0].chefId;

    //  4. NEW: Find Available Table for Dine-In 
    let assignedTableId = null;
    if (orderType === 'Dine-In') {
        const availableTables = await Table.find({
            status: 'Available',
            capacity: { $gte: numPersons } // Find tables that can fit the party
        }).sort({ capacity: 1 }); // Sort by capacity to find the smallest fitting table

        if (availableTables.length === 0) {
            throw new Error('No suitable tables are available for your party size.');
        }

        const bestFitTable = availableTables[0];
        assignedTableId = bestFitTable._id;

        // Reserve the table
        await Table.findByIdAndUpdate(assignedTableId, { status: 'Reserved' });
    }

    //  5. Generate Order ID and Create Order 
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    const newOrderId = lastOrder ? parseInt(lastOrder.orderId.substring(1)) + 1 : 101;
    const orderId = `#${newOrderId}`;

    const newOrderData = {
        orderId, orderType, items: itemsWithDetails, totalAmount, client: client._id,
        chef: assignedChef, estimatedCompletionTime, table: assignedTableId,
    };

    const newOrder = new Order(newOrderData);
    return await newOrder.save();
};

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus,
    placeOrder
};