const chefService = require("../services/chef.service");

const createChef = async (req, res) => {
    try {
        const chef = await chefService.createChef(req.body);
        res.status(201).json(chef);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllChef = async (req, res) => {
    try {
        const chefs = await chefService.getAllChef();
        res.status(200).json(chefs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getChefById = async (req, res) => {
    try {
        const chef = await chefService.getChefById(req.params.id)
        if (!chef) {
            return res.status(404).json({ message: "Chef not found" });
        }
        res.status(200).json(chef);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateChef = async (req, res) => {
    try {
        const updatedChef = await chefService.updateChef(req.params.id, req.body);
        if (!updatedChef) {
            return res.status(404).json({ message: "Chef not found" });
        }
        res.status(200).json(updatedChef)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteChef = async (req, res) => {
    const deletedChef = await chefService.deleteChef(req.params.id);
    if (!deletedChef) {
        return res.status(404).json({ message: "Chef not found" });
    }
    res.status(200).json(deletedChef);
}

module.exports = {
    createChef,
    getAllChef,
    getChefById,
    updateChef,
    deleteChef
}