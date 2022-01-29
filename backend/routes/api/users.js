const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const userService = require('../../db/services/user-service');

const router = express.Router();

// signup validation: check if errors exist and if so, handle errors
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Username must have at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// POST /api/users (create user)
router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({ user });
}));

// GET /api/users/:userId/events/published (get a user's published events)
router.get('/:userId/events/published', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const events = await userService.getAllPublishedEvents(userId);

    res.json(events);
}));

// GET /api/users/:userId/events/drafts (get a user's draft events)
router.get('/:userId/events/drafts', requireAuth, asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const userId = parseInt(req.params.userId);

    if (id === userId) {
        const events = await userService.getAllDraftEvents(userId);
        res.json(events);
    } else {
        const err = new Error('Forbidden');
        err.status = 403;
        err.title = 'User is not authorized';
        err.errors = ['You do not have permission to access this resource.'];
        return next(err);
    }
}));

// GET /api/users/:userId/events/registered (get all registrations of a user)
router.get('/:userId/events/registered', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const registrations = await userService.getAllRegisteredEvents(userId);

    res.json(registrations);
}));


module.exports = router;
