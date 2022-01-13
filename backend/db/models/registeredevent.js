'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegisteredEvent = sequelize.define('RegisteredEvent', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  RegisteredEvent.associate = function (models) {
    // associations can be defined here
  };
  return RegisteredEvent;
};
