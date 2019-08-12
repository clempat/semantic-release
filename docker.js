const Buffer = require('buffer').Buffer;
const createConfiguration = require('./index');

process.env.DOCKER_USERNAME = '_json_key';
process.env.DOCKER_PASSWORD = Buffer.from(process.env.GCR_JSON_KEY, 'base64').toString(
  'ascii'
);

module.exports = createConfiguration({
  verifyConditions: {
    path: 'semantic-release-docker',
    registryUrl: 'eu.gcr.io'
  },
  plugins: ['semantic-release-docker'],
  publish: [
    {
      path: 'semantic-release-docker',
      name: `eu.gcr.io/${process.env.GCR_PROJECT_ID}/${process.env.CI_PROJECT_NAME}`
    }
  ]
});
