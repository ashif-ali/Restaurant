const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true, // User-facing ID like '#108'
    },
    orderType: {
        type: String,
        required: true,
        enum: ['Dine-In', 'Takeaway'],
    },
    status: {
        type: String,
        required: true,
        enum: ['Processing', 'Done', 'Served', 'Not Picked Up', 'Cancelled'],
        default: 'Processing',
    },
    items: [{
        menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true },
        priceAtOrder: { type: Number, required: true }, // Price of the item when the order was placed
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    cookingInstructions: {
        type: String,
        trim: true,
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'Chef',
    },
    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table', // Only required for 'Dine-In' orders
    },
    estimatedCompletionTime: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;