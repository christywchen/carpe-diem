const db = require('../models');

// GET ALL EVENT CATEGORIES
async function getAllCategories() {
    return await db.Category.findAll();
}

// GET PUBLISHED EVENTS BY CATEGORY ID
async function getEventsByCategory(categoryId) {
    return await db.Event.findAll({
        include: [db.Venue, db.Category, db.User],
        where: {
            categoryId,
            published: true
        }
    });
}

module.exports = {
    getAllCategories,
    getEventsByCategory
}
