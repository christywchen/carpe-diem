const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Event } = require('../../db/models');

const router = express.Router();

// validate events
const validateEvent = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an event name.'),
    check('name')
        .isLength({ max: 75 })
        .withMessage('Maximum length is 75 characters.'),
    check('date')
        .exists({ checkFalsy: true })
        .withMessage('Choose a date for your event.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description about the event.'),
    check('capacity')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Please provide a number for your event\'s maximum capacity.'),
    handleValidationErrors
]

// GET /api/events (get all events)
router.get('/', asyncHandler(async (_req, res) => {
    const events = await Event.findAll();

    res.json({ events });
}));

// GET /api/events/:eventId (get an event)
router.get('/:eventId', asyncHandler(async (req, res) => {
    const eventId = parseInt(req.params.eventId, 10);
    const event = await Event.getEvent(eventId);

    res.json({ event });
}));

// POST /api/events (create event)
router.post('/', requireAuth, validateEvent, asyncHandler(async (req, res) => {
    const { id } = req.user;
    const event = await Event.createEvent(id, req.body);

    res.json({ event });
}));

// PATCH /api/events/:eventId (update an event)
router.patch('/:eventId', requireAuth, validateEvent, asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const eventId = parseInt(req.params.eventId, 10);
    const event = await Event.getEvent(eventId);
    const hostId = event.hostId;

    if (hostId === id) {
        const updatedEvent = await Event.updateEvent(event, req.body);
        res.json({ updatedEvent });
    } else {
        const err = new Error('Forbidden');
        err.status = 403;
        err.title = 'User is not authorized';
        err.errors = ['You do not have permission to access this resource.'];
        return next(err);
    }
}));

// DESTROY /api/events/:eventId (delete an event)
router.delete('/:eventId', requireAuth, asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const eventId = parseInt(req.params.eventId, 10);
    const event = await Event.getEvent(eventId);
    const hostId = event.hostId;

    if (hostId === id) {
        await Event.deleteEvent(event);
        res.json({ 'Success': 'Event deleted successfully' });
    } else {
        const err = new Error('Forbidden');;
        err.status = 403;
        err.title = 'User is not authorized';
        err.errors = ['You do not have permission to access this resource.'];
        return next(err);
    }
}));


module.exports = router;
