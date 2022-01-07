'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define('EventType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  EventType.associate = function (models) {
    // associations can be defined here
    EventType.hasMany(models.Event, {
      foreignKey: 'eventTypeId'
    });

  };
  return EventType;
};
