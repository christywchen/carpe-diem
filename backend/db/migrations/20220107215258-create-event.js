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
        type: Sequelize.STRING(150),
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      secretLocation: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      hostId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
        allowNull: false
      },
      venueId: {
        type: Sequelize.INTEGER,
        references: { model: 'Venues' },
        allowNull: false
      },
      eventTypeId: {
        type: Sequelize.INTEGER,
        references: { model: 'EventTypes' },
        allowNull: false
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
