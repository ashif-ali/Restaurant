const analyticsService = require('../services/analytics.service');

const getDashboardAnalytics = async (req, res) => {
    try {
        const data = await analyticsService.getDashboardAnalytics();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getRevenueChartData = async (req, res) => {
    try {
        const data = await analyticsService.getRevenueChartData(req.query.period);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderSummary = async (req, res) => {
    try {
        const data = await analyticsService.getOrderSummary(req.query.period);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getChefPerformance = async (req, res) => {
    try {
        const data = await analyticsService.getChefPerformance();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardAnalytics,
    getRevenueChartData,
    getOrderSummary,
    getChefPerformance
};