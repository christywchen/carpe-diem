const db = require('../models');

// GET ALL EVENT CATEGORIES
async function getAllCategories() {
    return await db.Category.findAll();
}

// GET EVENTS BY CATEGORY ID
async function getEventsByCategory(categoryId) {
    return await db.Event.findAll({
        where: {
            categoryId
        }
    });
}

module.exports = {
    getAllCategories,
    getEventsByCategory
}
