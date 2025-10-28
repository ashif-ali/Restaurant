
const MenuItem = require("../models/menuItem")

const getAllMenuItems = async (filter) => {
    return await MenuItem.find(filter);
};

const createMenuItem = async (itemData) => {
    const menuItem = new MenuItem(itemData);
    return await menuItem.save();
};

const getMenuItemById = async (id) => {
    return await MenuItem.findById(id);
};

const updateMenuItem = async (id, updateData) => {
    return await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
};

// Service to delete a menu item
const deleteMenuItem = async (id) => {
    return await MenuItem.findByIdAndDelete(id);
};

// Service to get all unique categories
const getCategories = async () => {
    return await MenuItem.distinct('category');
};

const getItemsByIds = async (itemIds) => {
    // Find all menu items where the _id is in the provided array
    return await MenuItem.find({ '_id': { $in: itemIds } });
};


module.exports = {
    getAllMenuItems,
    createMenuItem,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    getCategories,
    getItemsByIds
};