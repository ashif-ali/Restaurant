import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const placeOrder = async (orderData) => {
    try {
        const response = await apiClient.post('/orders/place', orderData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};