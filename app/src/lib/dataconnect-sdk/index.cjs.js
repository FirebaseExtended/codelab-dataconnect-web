const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'movie-connector',
  service: 'fdc-quickstart-web',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

