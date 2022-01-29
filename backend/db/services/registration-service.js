const db = require('../models');

// GET A USER'S EVENT REGISTRATION
async function getRegistration(userId, eventId) {
    const event = await db.RegisteredEvent.findOne({
        where: {
            userId,
            eventId
        }
    });

    return event;
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
