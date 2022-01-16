const express = require('express');
const asyncHandler = require('express-async-handler');

const categoryService = require('../../db/services/category-service');

const router = express.Router();

// GET /api/categories (get all event types)
router.get('/', asyncHandler(async (_req, res) => {
    const categories = await categoryService.getAllCategories();

    res.json(categories);
}));

// GET /api/categories/:categoryId (get published events by category)
router.get('/:categoryId/events', asyncHandler(async (req, res) => {
    const categoryId = parseInt(req.params.categoryId, 10);
    const events = await categoryService.getEventsByCategory(categoryId);

    res.json(events);
}));


module.exports = router;
