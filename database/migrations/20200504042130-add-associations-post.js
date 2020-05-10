'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // belongsToMany
    return queryInterface
      .createTable('posts_categories', {
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        post_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'posts', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        category_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'categories', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      })
      .then(() => {
        return queryInterface.createTable('posts_tags', {
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          post_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: 'posts', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          tag_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: 'tags', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        });
      })
      .then(() => {
        return queryInterface.addColumn(
          'posts', // name of Target model
          'user_id', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        );
      }).then(() => {
        return queryInterface.addColumn(
          'posts', // name of Target model
          'seo_id', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'seos', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        );
      });

  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface
      .dropTable('posts_categories')
      .then(() => {
        return queryInterface.dropTable('posts_tags');
      })
      .then(() => {
        return queryInterface.removeColumn(
          'posts', // name of Source model
          'user_id', // key we want to remove
        );
      });
  },
};
