const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller');

// Route to get all tables
router.get('/', tableController.getAllTables);

// Route to create a new table
router.post('/', tableController.createTable);

// Route to update a table
router.put('/:id', tableController.updateTable);

// Route to delete a table
router.delete('/:id', tableController.deleteTable);

module.exports = router;