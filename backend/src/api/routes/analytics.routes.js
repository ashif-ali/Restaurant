const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');

// A single endpoint to get all dashboard data
router.get('/dashboard', analyticsController.getDashboardAnalytics);
// Route for revenue chart
router.get('/revenue-chart', analyticsController.getRevenueChartData);

// Route for order summary
router.get('/order-summary', analyticsController.getOrderSummary);

router.get('/chef-performance', analyticsController.getChefPerformance);

module.exports = router;