const Chef = require("../models/chef.model");

const createChef = async (chefData) => {
    const newChef = new Chef(chefData);
    return await newChef.save();
}

const getAllChef = async () => {
    return await Chef.find();
}

const getChefById = async (chefId) => {
    return await Chef.findById(chefId);
}

const updateChef = async (chefId, updatedData) => {
    return await Chef.findByIdAndUpdate(chefId, updatedData, { new: true });
}

const deleteChef = async (chefId) => {
    return await Chef.findByIdAndDelete(chefId);
}

module.exports = {
    createChef,
    getAllChef,
    getChefById,
    updateChef,
    deleteChef
}