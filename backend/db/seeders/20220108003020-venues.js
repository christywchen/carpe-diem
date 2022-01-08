'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Venues', [
      {
        name: '1720',
        address: '1720 E 16th St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90021'
      }, {
        name: 'Sound',
        address: '1642 N. Las Palmas Ave',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90028'
      }, {
        name: 'Bill Graham Civic Auditorium',
        address: '99 Grove St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94102'
      }, {
        name: 'Exchange LA',
        address: '618 S Spring St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90014'
      }, {
        name: 'NOS Event Center',
        address: '689 S E St',
        city: 'San Bernardino',
        state: 'CA',
        zip: '92408'
      }, {
        name: 'Terminal 5',
        address: '610 West 56th Street',
        city: 'New York',
        state: 'NY',
        zip: '10019'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Venues', null, {});
  }
};
