# Quandoo semantic-release

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

My semantic release configuration

## 🚀 Install

```bash
npm install --registry http://35.246.221.0:4873 @clempat/semantic-release semantic-release
```

## 🎮 Usage

Only versioning and release notes without publishing.

```javascript
const createConfiguration = require('');
```

Versioning and release notes and publishing on docker (for apps/services)

```bash
npx semantic-release --extends @clempat/semantic-release/docker
```

Versioning and release notes and publishing on npm (packages)

```bash
npx semantic-release --extends @clempat/semantic-release/npm
```

### Environments variables

| Variables        | Description                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `CHANGELOG_FILE` | File path of the changelog as in [@semantic-release/changelog](https://github.com/semantic-release/changelog#options) will fallback to default |
