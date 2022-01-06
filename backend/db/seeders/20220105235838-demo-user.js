'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'potato@friend.com',
        username: 'PotatoFriend',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'angrykitten@cats.com',
        username: 'AngryKitten',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemoUser', 'PotatoFriend', 'AngryKitten'] }
    }, {});
  }
};
