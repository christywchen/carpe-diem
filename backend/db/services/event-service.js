const db = require('../models');

// GET ALL EVENTS (PUBLISHED)
async function getAllPublishedEvents() {
    return await db.Event.findAll({
        include: [db.Venue, db.EventType, db.User],
        where: {
            published: true
        }

    });
}

// GET AN EVENT (PUBLISHED)
async function getEvent(eventId) {
    return await db.Event.findByPk(eventId, {
        include: [db.Venue, db.EventType, db.User],
        where: {
            published: true
        }
    });
}

// CREATE AN EVENT
async function createEvent(userId, requestBody) {
    const {
        name,
        startTime,
        endTime,
        description,
        capacity,
        secretLocation,
        virtualEvent,
        eventUrl,
        imageUrl,
        published,
        venueId,
        eventTypeId
    } = requestBody;

    return await db.Event.create({
        name,
        startTime,
        endTime,
        description,
        capacity,
        secretLocation,
        virtualEvent,
        eventUrl,
        imageUrl,
        published,
        hostId: userId,
        venueId,
        eventTypeId
    });
}

// UPDATE AN EVENT
async function updateEvent(event, requestBody) {
    const {
        name,
        startTime,
        endTime,
        description,
        capacity,
        secretLocation,
        virtualEvent,
        eventUrl,
        imageUrl,
        published,
        venueId,
        eventTypeId
    } = requestBody;

    return await event.update({
        name,
        startTime,
        endTime,
        description,
        capacity,
        secretLocation,
        virtualEvent,
        eventUrl,
        imageUrl,
        published,
        venueId,
        eventTypeId
    })
};

// DELETE AN EVENT
async function deleteEvent(event) {
    return await event.destroy();
}

module.exports = {
    getAllPublishedEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}
