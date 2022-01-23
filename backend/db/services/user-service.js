const db = require('../models');

async function getAllPublishedEvents(userId) {
    return await db.Event.findAll({
        include: [db.Venue, db.Category, db.User],
        where: {
            published: true,
            hostId: userId
        }
    });
}

async function getAllDraftEvents(userId) {
    return await db.Event.findAll({
        include: [db.Venue, db.Category, db.User],
        where: {
            published: false,
            hostId: userId
        }
    });
}

async function getAllRegisteredEvents(userId) {
    return await db.RegisteredEvent.findAll({
        where: {
            userId
        },
        attributes: [
            'id',
            'userId',
            'eventId',
            'createdAt',
            'updatedAt'
        ]
    });
}

module.exports = {
    getAllPublishedEvents,
    getAllDraftEvents,
    getAllRegisteredEvents
};
