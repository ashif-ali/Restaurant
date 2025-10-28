const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to get all orders
router.get('/', orderController.getAllOrders);

router.post('/place', orderController.placeOrder);


// Route to update an order's status
// e.g., PUT /api/orders/6713e5a.../status
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;