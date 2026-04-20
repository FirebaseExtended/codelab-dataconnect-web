const { makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'friendly-exchange',
  service: 'your-project-id-service',
  location: 'us-west4'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider(),
    maxAgeSeconds: 10
  }
};
exports.dataConnectSettings = dataConnectSettings;
