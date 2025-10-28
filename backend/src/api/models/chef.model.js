
const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
}, {
    timestamps: true,
});

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;