import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const placeOrder = async (orderData) => {
    try {
        const response = await apiClient.post('/orders/place', orderData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};