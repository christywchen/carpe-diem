'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RegisteredEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: { model: 'Events' },
        allowNull: false,
        onDelete: 'CASCADE',
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
    }).then(() => queryInterface.addConstraint('RegisteredEvents', {
      fields: ['userId', 'eventId'],
      type: 'unique',
      name: 'uniqueRecord'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RegisteredEvents');
  }
};
