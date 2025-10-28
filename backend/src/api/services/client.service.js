const Client = require('../models/client.model');

const findOrCreateClient = async (clientData) => {
    const { phoneNumber, name } = clientData;

    // Find a client with the given phone number
    let client = await Client.findOne({ phoneNumber });

    // If no client is found, create a new one
    if (!client) {
        client = new Client({ name, phoneNumber });
        await client.save();
    }

    return client;
};

module.exports = { findOrCreateClient };