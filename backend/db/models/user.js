'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        loginUser: {
          attributes: {},
        },
      },
    });

  User.associate = function (models) {
    // associations can be defined here
  };

  // class methods
  User.prototype.toSafeObject = function () {
    // returns an object with User instance info that is safe to save to a jwt
    const { id, username, email } = this;
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    // accepts a password string and returns true if it matches the user's hashed password
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  // instance methods
  User.getCurrentUserbyId = async function (id) {
    // takes a the user id and returns the user with that id
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    // takes a credential and password in an object; either username or email
    // search for a user with the specified credential and validates the password
    // if password is valid, it returns the user
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    // accepts the username, email, and password in an object
    // hashes the password and creates a user with the hashed password, returning it
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
