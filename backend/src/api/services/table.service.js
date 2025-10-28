
const Table = require('../models/table.model');

// Service to get all tables, sorted by their number
const getAllTables = async () => {
    return await Table.find().sort({ tableNumber: 1 });
};

// Service to create a new table
const createTable = async (tableData) => {
    // Find the table with the highest number
    const lastTable = await Table.findOne().sort({ tableNumber: -1 });

    // Determine the next table number
    const nextTableNumber = lastTable ? lastTable.tableNumber + 1 : 1;

    const newTable = new Table({
        ...tableData,
        tableNumber: nextTableNumber,
    });

    return await newTable.save();
};

const updateTable = async (id, updateData) => {
    return await Table.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteTable = async (id) => {
    return await Table.findByIdAndDelete(id);
};

module.exports = {
    getAllTables,
    createTable,
    updateTable,
    deleteTable,
};