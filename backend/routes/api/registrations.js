const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const registrationService = require('../../db/services/registration-service');

const router = express.Router();

// GET /api/registrations/:userId (get all likes of a user)
router.get('/:userId', requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const registrations = await registrationService.getRegistrationsByUser(userId);

    res.json(registrations);
}));

module.exports = router;
