'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('RegisteredEvents', [
      {
        eventId: 1,
        userId: 1
      }, {
        eventId: 2,
        userId: 1
      }, {
        eventId: 3,
        userId: 1
      }, {
        eventId: 5,
        userId: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
