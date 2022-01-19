const db = require('../models');

// GET ALL EVENT REGISTRATIONS BY USER
async function getRegistrationsByUser(userId) {
    return await db.RegisteredEvent.findAll({
        where: {
            userId
        }
    });
};

module.exports = {
    getRegistrationsByUser
}
