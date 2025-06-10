const util = require('util');
const defaultConfig = require('./defaultConfig');
const userConfig = require('./userConfig');

const config = Object.assign({}, defaultConfig, userConfig);

module.exports = {
  // ...existing config options...
  watchOptions: {
    usePolling: true,
    interval: 1000, // Adjust polling interval as needed
  },
};