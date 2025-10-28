
import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const getAllTables = async () => {
    try {
        const response = await apiClient.get('/tables');
        return response.data;
    } catch (error) {
        console.error("Error fetching tables:", error);
        throw error;
    }
};

export const createTable = async (tableData) => {
    try {
        //the backend only needs the capacity. name is not in our model yet, but we can add it later. for now we only send what the API expects
        const response = await apiClient.post('/tables', { capacity: tableData.capacity });
        return response.data;
    } catch (error) {
        console.error("Error creating table:", error);
        throw error;
    }
};

export const deleteTable = async (tableId) => {
    try {
        const response = await apiClient.delete(`/tables/${tableId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting table:", error);
        throw error;
    }
};

export const updateTable = async (tableId, updateData) => {
    try {
        const response = await apiClient.put(`/tables/${tableId}`, updateData);
        return response.data;
    } catch (error) {
        console.error(`Error updating table ${tableId}:`, error);
        throw error;
    }
};