
const MenuItem = require("../models/menuItem.js")
const menuItemService = require('../services/menuItem.service');



const getAllMenuItems = async (req, res) => {
    try {
        const { category, searchTerm } = req.query;

        const filter = {};
        if (category && category !== 'All') {
            filter.category = category;
        }
        if (searchTerm) {
            filter.name = { $regex: searchTerm, $options: 'i' };
        }

        let query = MenuItem.find(filter);

        // apply pagination 
        if (req.query.page) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 6;
            const totalItems = await MenuItem.countDocuments(filter);

            query = query.limit(limit).skip((page - 1) * limit);

            const menuItems = await query.exec();

            return res.status(200).json({
                items: menuItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: Number(page),
            });
        }

        // if no page is requested, fetch all items
        const allItems = await query.exec();
        return res.status(200).json({ items: allItems });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// create a new menu item
const createMenuItem = async (req, res) => {
    try {
        const menuItem = await menuItemService.createMenuItem(req.body);
        res.status(201).json(menuItem); // 201 Created
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
};


const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await menuItemService.getMenuItemById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateMenuItem = async (req, res) => {
    try {
        const updatedMenuItem = await menuItemService.updateMenuItem(req.params.id, req.body);
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteMenuItem = async (req, res) => {
    try {
        const deletedMenuItem = await menuItemService.deleteMenuItem(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// This function will now work correctly
const getCategories = async (req, res) => {
    try {
        const categories = await menuItemService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getItemsByIds = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: 'Item IDs must be an array.' });
        }
        const items = await menuItemService.getItemsByIds(ids);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMenuItems,
    createMenuItem,
    getCategories,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    getItemsByIds
};