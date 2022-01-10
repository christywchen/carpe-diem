'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(75)
      },
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      secretLocation: {
        type: Sequelize.BOOLEAN
      },
      virtualEvent: {
        type: Sequelize.BOOLEAN
      },
      eventUrl: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      published: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      hostId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      venueId: {
        type: Sequelize.INTEGER,
        references: { model: 'Venues' }
      },
      eventTypeId: {
        type: Sequelize.INTEGER,
        references: { model: 'EventTypes' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};
