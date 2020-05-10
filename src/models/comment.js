'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    'comment',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    },
  );
  comment.associate = function (models) {
    models.comment.belongsTo(models.user);
    models.comment.belongsTo(models.post);
    models.comment.belongsTo(models.comment, {
      as: 'parent',
      foreignKey: 'parent_id',
    });
    models.comment.hasMany(models.comment, {
      as: 'children',
      foreignKey: 'parent_id',
    });
  };
  return comment;
};
