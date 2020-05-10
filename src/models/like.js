'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, { underscored: true });
  like.associate = function (models) {
    models.like.belongsTo(models.user);
    models.like.belongsTo(models.post);
  };
  return like;
};
