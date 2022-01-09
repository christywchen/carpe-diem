const db = require('../models');

// GET ALL EVENTS
async function getAllEvents() {
    return await db.Event.findAll({
        include: [db.Venue, db.EventType, db.User]
    });
}

// GET AN EVENT
async function getEvent(eventId) {
    return await db.Event.findByPk(eventId, {
        include: [db.Venue, db.EventType, db.User]
    });
}

// CREATE AN EVENT
async function createEvent(userId, requestBody) {
    const {
        name,
        date,
        description,
        capacity,
        secretLocation,
        venueId,
        eventTypeId
    } = requestBody;

    return await db.Event.create({
        name,
        date,
        description,
        capacity,
        secretLocation,
        hostId: userId,
        venueId,
        eventTypeId
    });
}

// UPDATE AN EVENT
async function updateEvent(event, requestBody) {
    const {
        name,
        date,
        description,
        capacity,
        secretLocation,
        venueId,
        eventTypeId
    } = requestBody;

    return await event.update({
        name,
        date,
        description,
        capacity,
        secretLocation,
        venueId,
        eventTypeId
    })
};

// DELETE AN EVENT
async function deleteEvent(event) {
    return await event.destroy();
}

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}
