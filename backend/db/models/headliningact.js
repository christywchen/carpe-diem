'use strict';
module.exports = (sequelize, DataTypes) => {
  const HeadliningAct = sequelize.define('HeadliningAct', {
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  HeadliningAct.associate = function (models) {
    // associations can be defined here
  };
  return HeadliningAct;
};
