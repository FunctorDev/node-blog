/* eslint-disable node/no-unpublished-require */
require('@babel/register');

const config = require('./config.js');

module.exports = config.default;
