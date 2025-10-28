const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItem.controller');

// Route to get all categories

// Route to get all menu items (or filter by category)
router.get('/', menuItemController.getAllMenuItems);

// Note: This is placed before '/:id' to avoid 'categories' being treated as an ID
router.get('/categories', menuItemController.getCategories);



// Route to create a new menu item
router.post('/', menuItemController.createMenuItem);
router.post('/by-ids', menuItemController.getItemsByIds); // Use POST to send a request body

// We would add other routes here as well
router.get('/:id', menuItemController.getMenuItemById);
router.put('/:id', menuItemController.updateMenuItem);
router.delete('/:id', menuItemController.deleteMenuItem);


module.exports = router;