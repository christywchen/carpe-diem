const db = require('../models');

// GET ALL EVENT TYPES
async function getAllCategories() {
    return await db.Category.findAll();
}

module.exports = {
    getAllCategories
}
