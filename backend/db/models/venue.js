'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        len: [2, 2]
      }
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 10]
      }
    },
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL
  }, {});
  Venue.associate = function (models) {
    // associations can be defined here
    Venue.hasMany(models.Event, {
      foreignKey: 'venueId'
    });
  };
  return Venue;
};
