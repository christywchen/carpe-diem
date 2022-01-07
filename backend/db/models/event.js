'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    capacity: DataTypes.INTEGER,
    secretLocation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    canceled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Event.belongsTo(models.EventType, {
      foreignKey: 'eventTypeId'
    });

    Event.belongsTo(models.Venue, {
      foreignKey: 'venueId'
    });

    Event.belongsToMany(models.User, {
      through: 'RegisteredEvent',
      otherKey: 'userId',
      foreignKey: 'eventId'
    });

    Event.belongsToMany(models.User, {
      through: 'LikedEvent',
      otherKey: 'userId',
      foreignKey: 'eventId'
    });

    Event.belongsToMany(models.Artist, {
      through: 'HeadliningAct',
      otherKey: 'artistId',
      foreignKey: 'eventId'
    });

    Event.belongsToMany(models.Artist, {
      through: 'SupportingAct',
      otherKey: 'artistId',
      foreignKey: 'eventId'
    });

    Event.belongsToMany(models.Genre, {
      through: 'EventGenre',
      otherKey: 'genreId',
      foreignKey: 'eventId'
    });
  };
  return Event;
};
