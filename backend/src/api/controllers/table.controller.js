
const tableService = require('../services/table.service');

//get all tables
const getAllTables = async (req, res) => {
    try {
        const tables = await tableService.getAllTables();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// create a new table
const createTable = async (req, res) => {
    try {
        // We only need capacity from the user, the number is auto-generated
        const { capacity } = req.body;
        if (!capacity) {
            return res.status(400).json({ message: 'Capacity is required.' });
        }
        const newTable = await tableService.createTable({ capacity });
        res.status(201).json(newTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// update a table
const updateTable = async (req, res) => {
    try {
        const updatedTable = await tableService.updateTable(req.params.id, req.body);
        if (!updatedTable) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.status(200).json(updatedTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// delete a table
const deleteTable = async (req, res) => {
    try {
        const deletedTable = await tableService.deleteTable(req.params.id);
        if (!deletedTable) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllTables,
    createTable,
    updateTable,
    deleteTable,
};