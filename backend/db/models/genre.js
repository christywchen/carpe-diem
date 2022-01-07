'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      }
    }
  }, {});
  Genre.associate = function (models) {
    // associations can be defined here
    Genre.belongsToMany(models.Event, {
      through: 'EventGenre',
      otherKey: 'eventId',
      foreignKey: 'genreId'
    });
  };
  return Genre;
};
