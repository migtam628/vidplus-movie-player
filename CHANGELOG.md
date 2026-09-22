# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-09-22

### Added
- Framework-agnostic VidPlus URL builder.
- Shared iframe attribute helper.
- React / Next.js responsive player component.
- Vue 3 responsive player component.
- Vanilla JavaScript DOM adapter with `update()` and `destroy()` lifecycle methods.
- Browser/CDN IIFE build.
- TypeScript declarations and ESM/CommonJS package outputs.
- Movie, TV, and anime embed path generation.
- Player appearance, playback, feature, server, and hide-control query options.

### Fixed before initial public release
- Added the missing `./vue` package export.
- Preserved omitted Vue Boolean options as `undefined` so they do not accidentally override upstream player defaults.
- Separated root/core imports from framework adapters to keep React and Vue optional.
- Switched ESM bundles to `.mjs` for reliable Node package-module detection without converting the build script to ESM.
