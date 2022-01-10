const db = require('../models');

async function getAllPublishedEvents(userId) {
    return await db.Event.findAll({
        include: [db.Venue, db.EventType, db.User],
        where: {
            published: true,
            hostId: userId
        }
    });
}

async function getAllDraftEvents(userId) {
    return await db.Event.findAll({
        include: [db.Venue, db.EventType, db.User],
        where: {
            published: false,
            hostId: userId
        }
    });
}

module.exports = {
    getAllPublishedEvents,
    getAllDraftEvents
};
