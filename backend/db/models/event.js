'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING(50),
      validate: {
        len: [1, 50]
      }
    },
    startTime: {
      type: DataTypes.DATE
    },
    endTime: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.TEXT
    },
    capacity: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    secretLocation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    virtualEvent: {
      type: DataTypes.BOOLEAN
    },
    eventUrl: {
      type: DataTypes.TEXT
    },
    imageUrl: {
      type: DataTypes.TEXT
    },
    imageName: {
      type: DataTypes.TEXT
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    venueId: {
      type: DataTypes.INTEGER
    },
    categoryId: {
      type: DataTypes.INTEGER
    },
  }, {});
  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsTo(models.User, {
      foreignKey: 'hostId'
    });

    Event.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });

    Event.belongsTo(models.Venue, {
      foreignKey: 'venueId'
    });

    Event.belongsToMany(models.User, {
      through: 'RegisteredEvent',
      otherKey: 'userId',
      foreignKey: 'eventId'
    });

    Event.belongsToMany(models.Artist, {
      through: 'HeadliningAct',
      otherKey: 'artistId',
      foreignKey: 'eventId',
      onDelete: 'cascade',
      hooks: true
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
