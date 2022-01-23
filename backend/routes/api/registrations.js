const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const registrationService = require('../../db/services/registration-service');

const router = express.Router();

// GET /api/registrations/users/:userId/events (get all registrations of a user)
router.get('/users/:userId/events', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const registrations = await registrationService.getRegistrationsByUser(userId);

    res.json(registrations);
}));

// GET /api/registrations/:registrationId (get a registration record)
router.get('/:registrationId', asyncHandler(async (req, res) => {
    const registrationId = parseInt(req.params.registrationId, 10);
    const registration = await registrationService.getRegistration(registrationId);

    res.json(registration);
}));

// POST /api/registrations/events/:eventId/users/:userId (register a user for an event)
router.post('/events/:eventId/users/:userId', asyncHandler(async (req, res) => {
    const { id } = req.user;
    const userId = parseInt(req.params.userId, 10);
    const eventId = parseInt(req.params.eventId, 10);

    let registration;

    if (userId == id) {
        registration = await registrationService.addUserToEvent(userId, eventId);
        res.json(registration);
    } else {
        const err = new Error('Forbidden');
        err.status = 403;
        err.title = 'User is not authorized';
        err.errors = ['You do not have permission to create this resource'];
        return next(err);
    }
}));

// DESTROY /api/registrations/:registrationId (delete a registration)
router.delete('/:registrationId', requireAuth, asyncHandler(async (req, res) => {
    const registrationId = parseInt(req.params.registrationId, 10);
    const registration = await registrationService.getRegistration(registrationId);

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
