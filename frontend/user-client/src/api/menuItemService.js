import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const getAllCategories = async () => {
    try {
        const response = await apiClient.get('/menu/categories');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};


export const getMenuItems = async (category, page = 1, searchTerm = '') => {
    try {
        let url = `/menu?page=${page}&limit=6`;
        if (category && category !== 'All') {
            url += `&category=${category}`;
        }
        if (searchTerm) {
            url += `&searchTerm=${searchTerm}`;
        }
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error;
    }
};


export const getMenuItemsByIds = async (ids) => {
    try {
        const response = await apiClient.post('/menu/by-ids', { ids });
        return response.data;
    } catch (error) {
        console.error("Error fetching menu items by IDs:", error);
        throw error;
    }
};