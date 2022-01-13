'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    bio: DataTypes.TEXT
  }, {});
  Artist.associate = function (models) {
    // associations can be defined here
    Artist.belongsToMany(models.Event, {
      through: 'HeadliningAct',
      otherKey: 'eventId',
      foreignKey: 'artistId'
    });

    Artist.belongsToMany(models.Event, {
      through: 'SupportingAct',
      otherKey: 'eventId',
      foreignKey: 'artistId'
    });
  };
  return Artist;
};
