'use strict';
module.exports = (sequelize, DataTypes) => {
  const SupportingAct = sequelize.define('SupportingAct', {
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  SupportingAct.associate = function (models) {
    // associations can be defined here
  };
  return SupportingAct;
};
