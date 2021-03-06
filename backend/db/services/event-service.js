const db = require('../models');

// GET ALL EVENTS (PUBLISHED)
async function getAllEvents() {
    return await db.Event.findAll({
        include: [db.Venue, db.Category, db.User],
    });
}

// GET AN EVENT (PUBLISHED)
async function getEvent(eventId) {
    return await db.Event.findByPk(eventId, {
        include: [db.Venue, db.Category, db.User],
    });
}

// CREATE AN EVENT
async function createEvent(userId, imageUrl, requestBody) {
    const {
        name,
        startTime,
        endTime,
        description,
        capacity,
        eventUrl,
        venueId,
        categoryId,
        imageName
    } = requestBody;

    const secretLocation = requestBody.secretLocation === 'true' ? true : false;
    const virtualEvent = requestBody.virtualEvent === 'true' ? true : false;
    const published = requestBody.published === 'true' ? true : false;

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
        imageName,
        published,
        hostId: userId,
        venueId,
        categoryId
    });
}

// UPDATE AN EVENT
async function updateEvent(event, imageUrl, requestBody) {
    const {
        name,
        startTime,
        endTime,
        description,
        capacity,
        eventUrl,
        venueId,
        categoryId,
        imageName
    } = requestBody;

    const secretLocation = requestBody.secretLocation === 'true' ? true : false;
    const virtualEvent = requestBody.virtualEvent === 'true' ? true : false;
    const published = requestBody.published === 'true' ? true : false;

    return await event.update({
        name,
        startTime: startTime === undefined ? null : startTime,
        endTime: endTime === undefined ? null : endTime,
        description,
        capacity,
        secretLocation,
        virtualEvent,
        eventUrl,
        imageUrl: imageName === 'null' ? null : imageUrl,
        imageName: imageName === 'null' ? null : imageName,
        published,
        venueId,
        categoryId
    });
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
