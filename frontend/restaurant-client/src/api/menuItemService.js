
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getAllMenuItems = async () => {
    try {
        const response = await apiClient.get('/menu');
        return response.data;
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error;
    }
};