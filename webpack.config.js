const path = require('path');

module.exports = {
  // ...existing code...
  watchOptions: {
    usePolling: true,
    aggregateTimeout: 300,
    poll: 1000, // Adjust polling interval as needed
  },
  // ...existing code...
};