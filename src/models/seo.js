'use strict';
module.exports = (sequelize, DataTypes) => {
  const seo = sequelize.define(
    'seo',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      keywords: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    },
  );
  seo.associate = function (models) {
    models.seo.hasOne(models.post);
  };
  return seo;
};
