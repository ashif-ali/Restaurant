
import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

//fetches all orders
export const getAllOrders = async () => {
    try {
        const response = await apiClient.get('/orders');
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

//updates the status of a specific order
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await apiClient.put(`/orders/${orderId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};