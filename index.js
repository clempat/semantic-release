const path = require('path');
const fs = require('fs');
const pomPath = path.resolve(process.cwd(), 'pom.xml');
const packagejsonPath = path.resolve(process.cwd(), 'package.json');
const hasPackagejson = fs.existsSync(packagejsonPath);
const omit = require('lodash/omit');

module.exports = (options = {}) => {
  const plugins = options.plugins || [];
  const otherOptions = omit(options, 'plugins');
  const changelogPath = process.env.CHANGELOG_FILE;

  return {
    branch: 'master',
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      [
        '@semantic-release/changelog',
        Boolean(changelogPath)
          ? {
              changelogFile: changelogPath
            }
          : {}
      ],
      ...plugins,
      '@semantic-release/github',
      [
        '@semantic-release/git',
        {
          assets: [
            Boolean(changelogPath) ? changelogPath : 'CHANGELOG.md',
            ...(hasPackagejson ? ['package.json'] : [])
          ],
          message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}'
        }
      ]
    ],
    ...otherOptions
  };
};
