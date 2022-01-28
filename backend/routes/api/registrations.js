const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const registrationService = require('../../db/services/registration-service');
const eventService = require('../../db/services/event-service');

const router = express.Router();

/// GET /api/registrations/events/:eventId
router.get('/events/:eventId', asyncHandler(async (req, res) => {
    const eventId = parseInt(req.params.eventId, 10);

    const registrations = await registrationService.getRegistrations(eventId);

    res.json(registrations)
}));

// POST /api/registrations (create event registration)
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { id } = req.user;

    let registration;

    if (req.body.userId === id) {
        registration = await registrationService.addUserToEvent(req.body);
        res.json(registration);
    } else {
        const err = new Error('Forbidden');
        err.status = 403;
        err.title = 'User is not authorized';
        err.errors = ['You do not have permission to create this resource'];
        return next(err);
    }
}));

// DESTROY /api/registrations/events/:eventId/users/:userId (delete a registration)
router.delete('/events/:eventId/users/:userId', requireAuth, asyncHandler(async (req, res) => {
    const { id } = req.user;

    const userId = parseInt(req.params.userId, 10);
    const eventId = parseInt(req.params.eventId, 10);

    const registration = await registrationService.getRegistration(userId, eventId);

    if (userId === id) {
        await registrationService.removeUserFromEvent(registration);
        res.json({ 'Success': 'User event registration deleted successfully' });
    } else {
        const err = new Error('Forbidden');
        err.status = 403;
        err.title = 'User is not authorized';
        err.errors = ['You do not have permission to access this resource'];
        return next(err);
    }
}));

module.exports = router;
