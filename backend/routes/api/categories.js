const express = require('express');
const asyncHandler = require('express-async-handler');

const categoryService = require('../../db/services/category-service');

const router = express.Router();

// GET /api/categories (get all event types)
router.get('/', asyncHandler(async (_req, res) => {
    const categories = await categoryService.getAllCategories();

    res.json(categories);
}));

module.exports = router;
