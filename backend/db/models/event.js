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
    virtualEvent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    eventUrl: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    venueId: {
      type: DataTypes.INTEGER
    },
    eventTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
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

  Event.getAllEvents = async function () {
    return await Event.findAll();
  }

  Event.getEvent = async function (eventId) {
    return await Event.findByPk(eventId);
  }

  Event.createEvent = async function (userId, requestBody) {
    const {
      name,
      date,
      description,
      capacity,
      secretLocation,
      venueId,
      eventTypeId
    } = requestBody;

    return await Event.create({
      name,
      date,
      description,
      capacity,
      secretLocation,
      hostId: userId,
      venueId,
      eventTypeId
    });
  }

  Event.updateEvent = async function (event, requestBody) {
    const {
      name,
      date,
      description,
      capacity,
      secretLocation,
      venueId,
      eventTypeId
    } = requestBody;

    return await event.update({
      name,
      date,
      description,
      capacity,
      secretLocation,
      venueId,
      eventTypeId
    })
  };

  Event.deleteEvent = async function (event) {
    return await event.destroy();
  }

  return Event;
};
