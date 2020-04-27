# node-find

[![Build Status (Windows)][image-build-windows]][link-build-windows]
[![Build Status (macOS)][image-build-macos]][link-build-macos]
[![Build Status (Linux)][image-build-linux]][link-build-linux]
[![Code Coverage][image-code-coverage]][link-code-coverage]
[![Release][image-release]][link-release]
[![Node.js version][image-engine]][link-engine]
[![License][image-license]][link-license]

simple 'find' implementation and some more useful options

## Install

```bash
npm i @shimataro/node-find
```

## Examples

### optimize multiple SVG files using [svgo](https://www.npmjs.com/package/svgo)

`package.json`:

```json
{
  "scripts": {
    "build": "node-find src -name '*.svg' -exec svgo -i {} -o dist/{r=src} \\;"
  }
}
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

[image-build-windows]: https://github.com/shimataro/node-find/workflows/Windows/badge.svg
[link-build-windows]: https://github.com/shimataro/node-find/actions?query=workflow%3AWindows
[image-build-macos]: https://github.com/shimataro/node-find/workflows/macOS/badge.svg
[link-build-macos]: https://github.com/shimataro/node-find/actions?query=workflow%3AmacOS
[image-build-linux]: https://github.com/shimataro/node-find/workflows/Linux/badge.svg
[link-build-linux]: https://github.com/shimataro/node-find/actions?query=workflow%3ALinux
[image-code-coverage]: https://img.shields.io/codecov/c/github/shimataro/node-find/develop.svg
[link-code-coverage]: https://codecov.io/gh/shimataro/node-find
[image-release]: https://img.shields.io/github/release/shimataro/node-find.svg
[link-release]: https://github.com/shimataro/node-find/releases
[image-engine]: https://img.shields.io/node/v/@shimataro/node-find.svg
[link-engine]: https://nodejs.org/
[image-license]: https://img.shields.io/github/license/shimataro/node-find.svg
[link-license]: ./LICENSE
