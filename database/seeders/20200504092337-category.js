'use strict';

const models = require('../../src/models');

const CategoryModel = models.category;

module.exports = {
  up: () => {
    return CategoryModel.bulkCreate([
      {
        title: 'JavaScript',
        slug: 'javascript',
        description: '',
      },
      {
        title: 'Node.js',
        slug: 'nodejs',
        description: '',
      },
      {
        title: 'React.js',
        slug: 'reactjs',
        description: '',
      },
      {
        title: 'FrontEnd',
        slug: 'frontend',
        description: '',
      },
      {
        title: 'BackEnd',
        slug: 'backend',
        description: '',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'categories',
      {
        slug: {
          [Op.in]: ['javascript', 'nodejs', 'reactjs', 'frontend', 'backend'],
        },
      },
      {},
    );
  },
};
