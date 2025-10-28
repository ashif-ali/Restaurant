const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    capacity: {
        type: Number,
        required: true,
        enum: [2, 4, 6, 8],
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Reserved'],
        default: 'Available',
    },
}, {
    timestamps: true,
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;