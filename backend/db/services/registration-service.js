const db = require('../models');

// GET A USER'S EVENT REGISTRATION
async function getRegistration(registrationId) {
    return await db.RegisteredEvent.findByPk(registrationId);
}

// CREATE A USER REGISTRATION FOR AN EVENT
async function addUserToEvent(req) {
    return await db.RegisteredEvent.create({
        userId: req.userId,
        eventId: req.eventId
    });
}

// DESTROY A REGISTRATION RECORD
async function removeUserFromEvent(registration) {
    return await registration.destroy();
}

module.exports = {
    getRegistration,
    addUserToEvent,
    removeUserFromEvent
}