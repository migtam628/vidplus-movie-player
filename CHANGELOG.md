# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased] - 2026-09-22

### Changed
- Migrated the runtime integration from VidPlus to VidUp (`https://vidup.to`).
- Changed movie URLs to `https://vidup.to/movie/{IMDb-or-TMDB-ID}`.
- Changed TV URLs to `https://vidup.to/tv/{IMDb-or-TMDB-ID}/{season}/{episode}`.
- Made `buildVidUpUrl()` the primary URL builder.
- Retained `buildVidPlusUrl()` as a deprecated compatibility alias that now returns VidUp URLs.
- Replaced VidPlus lowercase query serialization with VidUp's case-preserving parameters such as `autoPlay`, `autoNext`, `nextButton`, and `startAt`.
- Replaced VidPlus-specific appearance/server/hide-control options with VidUp-focused options.
- Changed the browser global from `VidPlusMoviePlayer` to `VidUpMoviePlayer`.
- Updated React, Next.js, Vue, Vanilla, security, contribution, and README documentation.

### Removed
- VidPlus `https://player.vidplus.to/embed` runtime dependency.
- Anime/AniList route support from the first-class API.
- VidPlus-only parameters such as icon sets, primary/secondary/icon colors, WatchParty, server icons, PIP flags, and hide-control flags.

## [1.0.0] - 2026-09-22

### Added
- Initial framework-agnostic player wrapper.
- Shared iframe attribute helper.
- React / Next.js responsive player component.
- Vue 3 responsive player component.
- Vanilla JavaScript DOM adapter with `update()` and `destroy()` lifecycle methods.
- Browser/CDN IIFE build.
- TypeScript declarations and ESM/CommonJS package outputs.
