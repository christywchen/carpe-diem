const db = require('../models');

// GET ALL EVENT REGISTRATIONS BY USER
async function getRegistrationsByUser(userId) {
    return await db.RegisteredEvent.findAll({
        where: {
            userId
        }
    });
}

// GET A USER'S EVENT REGISTRATION
async function getRegistration(registrationId) {
    return await db.RegisteredEvent.findByPk(registrationId);
}

// CREATE A USER REGISTRATION FOR AN EVENT
async function addUserToEvent(userId, eventId) {
    return await db.RegisteredEvent.create({
        userId,
        eventId
    });
}

// DESTROY A REGISTRATION RECORD
async function removeUserFromEvent(registration) {
    return await registration.destroy();
}

module.exports = {
    getRegistrationsByUser,
    getRegistration,
    addUserToEvent,
    removeUserFromEvent
}
