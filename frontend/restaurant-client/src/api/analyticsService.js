import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// functions to fetch the main dashboad analytics data

export const getDashboardAnalytics = async () => {
    try {
        const response = await apiClient.get('/analytics/dashboard');
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard analytics: ", error);
        throw error;
    }
}

export const getRevenueChartData = async (period = 'daily') => {
    const response = await apiClient.get(`/analytics/revenue-chart?period=${period}`);
    return response.data;
};

export const getOrderSummary = async (period = 'daily') => {
    const response = await apiClient.get(`/analytics/order-summary?period=${period}`);
    return response.data;
};

export const getChefPerformance = async () => {
    const response = await apiClient.get('/analytics/chef-performance');
    return response.data;
};