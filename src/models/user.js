'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    },
  );

  user.associate = function (models) {
    models.user.hasMany(models.like);
    models.user.hasMany(models.comment);
    models.user.hasMany(models.post);
  };

  user.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 8).then((hashedPassword) => {
      user.password = hashedPassword;
    });
  });
  return user;
};
