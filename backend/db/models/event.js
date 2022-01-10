'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING
    },
    endTime: {
      type: DataTypes.DATE
    },
    endTime: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.TEXT
    },
    capacity: {
      type: DataTypes.INTEGER
    },
    secretLocation: {
      type: DataTypes.BOOLEAN
    },
    virtualEvent: {
      type: DataTypes.BOOLEAN
    },
    eventUrl: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    published: {
      type: DataTypes.BOOLEAN
    },
    hostId: {
      type: DataTypes.INTEGER
    },
    venueId: {
      type: DataTypes.INTEGER
    },
    eventTypeId: {
      type: DataTypes.INTEGER
    },
  }, {});
  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsTo(models.User, {
      foreignKey: 'hostId'
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
