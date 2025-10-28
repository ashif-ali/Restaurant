import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const findOrCreateClient = async (clientData) => {
    try {
        const response = await apiClient.post('/clients/find-or-create', clientData);
        return response.data;
    } catch (error) {
        console.error("Error finding or creating client:", error);
        throw error;
    }
};