'use strict';

import slugify from 'slugify';
import { removeAccents } from '@/utils/common';
import { fileUploadUrl } from '@/utils';

module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'post',
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
      slug: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      summary: {
        type: DataTypes.TEXT,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      thumbnail_url: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return fileUploadUrl(this.thumbnail);
        },
      },
      status: {
        type: DataTypes.ENUM('PUBLISH', 'DRAFT'),
      },
    },
    {
      underscored: true,
    },
  );

  post.associate = function (models) {
    models.post.belongsTo(models.user);
    models.post.hasMany(models.comment);
    models.post.hasMany(models.like);
    models.post.belongsToMany(models.category, { through: 'posts_categories' });
    models.post.belongsToMany(models.tag, { through: 'posts_tags' });
    models.post.belongsTo(models.seo);
  };

  const makeSlug = (attributes) => {
    if (!attributes.slug) {
      const title = removeAccents(attributes.title) || '';
      return slugify(title.toLocaleLowerCase());
    }

    return attributes.slug;
  };

  post.beforeCreate((post) => {
    const slug = makeSlug(post);
    post.slug = slug;
  });

  post.beforeBulkUpdate(({ attributes }) => {
    const slug = makeSlug(attributes);
    attributes.slug = slug;
  });

  return post;
};
