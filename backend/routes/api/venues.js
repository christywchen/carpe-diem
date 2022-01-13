const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const venueService = require('../../db/services/venue-service');

const router = express.Router();

// validate venues
const validateVenues = [
    check('published')
        .exists()
        .withMessage('Venue needs a status of published: true or false.'),
    check('name')
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide an venue name.')
        .isLength({ max: 50 })
        .withMessage('Maximum length for venue name is 50 characters.'),
    check('address')
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide an address.')
        .isLength({ max: 100 })
        .withMessage('Maximum length for address is 100 characters'),
    check('city')
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide a city.')
        .isLength({ max: 50 })
        .withMessage('Maximum length for city 50 characters'),
    check('state')
        .if((value, { req }) => req.body.published)
        .matches(/^[a-zA-Z]{2}$/)
        .withMessage('Please provide a valid two state abbreviation'),
    check('zip')
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .matches(/^\d{5}(?:[-\s]?\d{4})?$/)
        .withMessage('Please provide a valid zip code'),
    handleValidationErrors
]

// GET /api/venues (get all venues)
router.get('/', asyncHandler(async (_req, res) => {
    const venues = await venueService.getAllVenues();

    res.json(venues);
}));

// GET /api/venues/:venueId (get a venue)
router.get('/:venueId', asyncHandler(async (req, res) => {
    const venueId = parseInt(req.params.venueId, 10);
    const venue = await venueService.getVenue(venueId);

    res.json(venue);
}));

// POST /api/venues/:venueId (add a venue)
router.post('/', requireAuth, validateVenues, asyncHandler(async (req, res) => {
    const venue = await venueService.createVenue(req.body);

    res.json(venue);
}));


// PATCH /api/venues/:venueId (update a venue)
router.patch('/:venueId', requireAuth, validateVenues, asyncHandler(async (req, res) => {
    const venueId = parseInt(req.params.venueId, 10);
    const venue = await venueService.getVenue(venueId);
    const updatedVenue = await venueService.updateVenue(venue, req.body);

    res.json(updatedVenue);
}));

module.exports = router;
