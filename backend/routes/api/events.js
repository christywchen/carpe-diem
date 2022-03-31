const express = require('express');
const asyncHandler = require('express-async-handler');
const { body, check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const eventService = require('../../db/services/event-service');

const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

// validate events
const validateEvent = [
    check('name')
        .if((value, { req }) => req.body.published === 'true')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an event name.')
        .isLength({ max: 50 })
        .withMessage('Maximum event name length is 50 characters.'),
    check('startTime')
        .if((value, { req }) => req.body.published === 'true')
        .exists({ checkFalsy: true })
        .withMessage('Choose a start time for your event.'),
    check('endTime')
        .if((value, { req }) => req.body.published === 'true')
        .exists({ checkFalsy: true })
        .withMessage('Choose a end time for the event.'),
    check('description')
        .if((value, { req }) => req.body.published === 'true')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description about the event.'),
    check('categoryId')
        .if((value, { req }) => req.body.published !== 'false')
        .notEmpty()
        .withMessage('Events require a category.'),
    check('virtualEvent')
        .if((value, { req }) => req.body.published === 'true')
        .exists({ checkFalsy: true })
        .withMessage('Please denote if the event is virtual or physical.'),
    check('venueId')
        .if((value, { req }) => req.body.published === 'true')
        .if((value, { req }) => req.body.virtualEvent === 'false')
        .notEmpty()
        .withMessage('Physical events require a venue location.'),
    check('capacity')
        .if((value, { req }) => req.body.published === 'true')
        .if((value, { req }) => req.body.virtualEvent === 'false')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a capacity for the event.')
        .isFloat({ min: 1 })
        .withMessage('Please provide a valid number for the event\'s maximum capacity.'),
    handleValidationErrors
]

// GET /api/events (get all published events)
router.get('/', asyncHandler(async (_req, res) => {
    const events = await eventService.getAllEvents();

    res.json(events);
}));

// GET /api/events/:eventId (get an event)
router.get('/:eventId', asyncHandler(async (req, res) => {
    const eventId = parseInt(req.params.eventId, 10);
    const event = await eventService.getEvent(eventId);

    res.json(event);
}));

// POST /api/events (create event)
router.post('/', requireAuth, singleMulterUpload("image"), validateEvent, asyncHandler(async (req, res) => {
    const { id } = req.user;

    let imageUrl;
    if (req.file) {
        imageUrl = await singlePublicFileUpload(req.file);
    }

    const event = await eventService.createEvent(id, imageUrl, req.body);

    res.json(event);
}));

// PATCH /api/events/:eventId (update an event)
router.patch('/:eventId', requireAuth, singleMulterUpload("image"), validateEvent, asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const eventId = parseInt(req.params.eventId, 10);
    const event = await eventService.getEvent(eventId);
    const hostId = event.hostId;

    let imageUrl;
    if (req.file) {
        imageUrl = await singlePublicFileUpload(req.file);
    }

    if (hostId === id) {
        const updatedEvent = await eventService.updateEvent(event, imageUrl, req.body);

        await updatedEvent.reload();
        res.json(updatedEvent);
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
    const event = await eventService.getEvent(eventId);
    const hostId = event.hostId;

    if (hostId === id) {
        await eventService.deleteEvent(event);
        res.json({ 'Success': 'Event deleted successfully' });
    } else {
        const err = new Error('Forbidden');
        err.status = 403;
        err.title = 'User is not authorized';
        err.errors = ['You do not have permission to access this resource.'];
        return next(err);
    }
}));

module.exports = router;
