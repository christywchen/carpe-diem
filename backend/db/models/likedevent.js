'use strict';
module.exports = (sequelize, DataTypes) => {
  const LikedEvent = sequelize.define('LikedEvent', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  LikedEvent.associate = function (models) {
    // associations can be defined here
  };
  return LikedEvent;
};
