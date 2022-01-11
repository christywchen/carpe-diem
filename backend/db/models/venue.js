'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    name: {
      type: DataTypes.STRING(50),
      validate: {
        len: [1, 50]
      }
    },
    address: {
      type: DataTypes.STRING(100),
      validate: {
        len: [1, 50]
      }
    },
    city: {
      type: DataTypes.STRING(50),
      validate: {
        len: [1, 50]
      }
    },
    state: {
      type: DataTypes.STRING(2),
      validate: {
        len: [2, 2],
        isAlpha: true
      },
    },
    zip: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 10]
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
    },
    lng: {
      type: DataTypes.DECIMAL,
    },
    published: {
      type: DataTypes.BOOLEAN
    }
  }, {});
  Venue.associate = function (models) {
    // associations can be defined here
    Venue.hasMany(models.Event, {
      foreignKey: 'venueId'
    });
  };
  return Venue;
};
