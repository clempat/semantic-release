jest.mock('fs', () => new (require('memory-fs'))());
const createConfiguration = require('./index');
const flatten = require('lodash/flatten');
const fs = require('fs');

describe('extends configuration', () => {
  beforeEach(() => {
    delete process.env.CHANGELOG_FILE;
  });
  it('should not fails when not options passed', () => {
    const config = createConfiguration();
    expect(config).toEqual(expect.any(Object));
  });

  it('should add plugins before the commit plugin', () => {
    const config = createConfiguration({ plugins: ['my-awesome-plugin'] });
    expect(config).toEqual(
      expect.objectContaining({
        plugins: expect.arrayContaining(['my-awesome-plugin'])
      })
    );

    const pluginIndex = config.plugins.findIndex(
      plugin => plugin === 'my-awesome-plugin'
    );

    const laterPlugin = config.plugins.slice(pluginIndex);
    expect(flatten(laterPlugin)).toEqual(expect.arrayContaining(['my-awesome-plugin']));
  });

  it('should allow other options to be added', () => {
    const config = createConfiguration({ publish: ['my-publish'] });
    expect(config).toEqual(
      expect.objectContaining({
        publish: ['my-publish']
      })
    );
  });

  it('should add the changelog to configuration', () => {
    process.env.CHANGELOG_FILE = 'my/path/to.md';

    const config = createConfiguration({ publish: ['my-publish'] });
    expect(config).toEqual(
      expect.objectContaining({
        plugins: expect.arrayContaining([
          [
            '@semantic-release/changelog',
            expect.objectContaining({ changelogFile: 'my/path/to.md' })
          ]
        ])
      })
    );

    expect(config).toEqual(
      expect.objectContaining({
        plugins: expect.arrayContaining([
          [
            '@semantic-release/git',
            expect.objectContaining({
              assets: expect.arrayContaining(['my/path/to.md'])
            })
          ]
        ])
      })
    );
  });
});