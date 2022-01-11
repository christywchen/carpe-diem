const db = require('../../db/models');

// GET ALL VENUES
async function getAllVenues() {
    return await db.Venue.findAll();
}

// GET A VENUE
async function getVenue(venueId) {
    return await db.Venue.findByPk(venueId);
}

// CREATE A VENUE
async function createVenue(requestBody) {
    const {
        name,
        address,
        city,
        state,
        zip,
        lat,
        long
    } = requestBody;

    return await db.Venue.create({
        name,
        address,
        city,
        state,
        zip,
        lat,
        long
    });
}

// UPDATE A VENUE
async function updateVenue(venue, requestBody) {
    const {
        name,
        address,
        city,
        state,
        zip,
        lat,
        long
    } = requestBody;

    return await venue.update({
        name,
        address,
        city,
        state,
        zip,
        lat,
        long
    });
}

module.exports = {
    getAllVenues,
    getVenue,
    createVenue,
    updateVenue
}
