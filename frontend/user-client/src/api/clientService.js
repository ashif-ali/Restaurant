import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
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