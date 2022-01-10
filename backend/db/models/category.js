'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {});
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Event, {
      foreignKey: 'categoryId'
    });

  };
  return Category;
};
