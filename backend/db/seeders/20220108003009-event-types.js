'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('EventTypes', [
      { name: 'Festival' },
      { name: 'Club' },
      { name: 'Concert' },
      { name: 'Warehouse' },
      { name: 'Online' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('EventTypes', null, {});
  }
};
