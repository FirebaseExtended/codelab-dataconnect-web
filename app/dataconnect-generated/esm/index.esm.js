import { makeMemoryCacheProvider } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'friendly-exchange',
  service: 'your-project-id-service',
  location: 'us-west4'
};
export const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider(),
    maxAgeSeconds: 10
  }
};
