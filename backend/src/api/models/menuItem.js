const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    averagePreparationTime: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;