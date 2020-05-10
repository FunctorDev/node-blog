'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    'tag',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    },
  );
  tag.associate = function (models) {
    models.tag.belongsToMany(models.post, { through: 'posts_tags' });
  };
  return tag;
};
