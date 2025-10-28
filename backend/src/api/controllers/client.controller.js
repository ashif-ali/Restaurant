const clientService = require('../services/client.service');

const findOrCreate = async (req, res) => {
    try {
        const client = await clientService.findOrCreateClient(req.body);
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { findOrCreate };