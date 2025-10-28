
const orderService = require('../services/order.service');

//create a new order
const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update an order's status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }
        const updatedOrder = await orderService.updateOrderStatus(req.params.id, status);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const placeOrder = async (req, res) => {
    try {
        const order = await orderService.placeOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus,
    placeOrder
};