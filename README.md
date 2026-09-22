# VidUp Movie Player

> A typed, framework-friendly wrapper for building and embedding **VidUp** movie and TV players in React, Next.js, Vue 3, Vanilla JavaScript, TypeScript, and plain HTML projects.

[![CI](https://github.com/migtam628/vidplus-movie-player/actions/workflows/ci.yml/badge.svg)](https://github.com/migtam628/vidplus-movie-player/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)
[![Provider](https://img.shields.io/badge/provider-VidUp-111827.svg)](https://vidup.to/#documentation)

**Upstream provider:** [VidUp](https://vidup.to/)  
**VidUp documentation:** [https://vidup.to/#documentation](https://vidup.to/#documentation)  
**Repository:** https://github.com/migtam628/vidplus-movie-player

> **Important:** the GitHub repository and package name currently remain `vidplus-movie-player` for compatibility, but the runtime integration now targets **VidUp (`vidup.to`)**, not VidPlus.

---

## What changed?

This project originally targeted:

```text
https://player.vidplus.to/embed
```

It now targets VidUp directly:

```text
https://vidup.to
```

That is **not** just a hostname replacement.

VidUp uses a different public URL structure and different query parameter names/casing.

For example:

```text
https://vidup.to/movie/tt0480249?autoPlay=true
```

and:

```text
https://vidup.to/tv/1396/1/1?autoPlay=true&autoNext=true&nextButton=true
```

The source code, framework adapters, examples, and documentation in this repository are now written around VidUp's URL format.

---

# Table of contents

1. [Overview](#overview)
2. [Features](#features)
3. [VidUp URL formats](#vidup-url-formats)
4. [Supported IDs](#supported-ids)
5. [Installation](#installation)
6. [Package entry points](#package-entry-points)
7. [Quick start](#quick-start)
8. [React](#react)
9. [Next.js](#nextjs)
10. [Vue 3](#vue-3)
11. [Vanilla JavaScript](#vanilla-javascript)
12. [Browser / CDN build](#browser--cdn-build)
13. [HTML-only embed](#html-only-embed)
14. [Core URL builder](#core-url-builder)
15. [API reference](#api-reference)
16. [VidUp query parameters](#vidup-query-parameters)
17. [Extra parameters](#extra-parameters)
18. [Responsive layout](#responsive-layout)
19. [Vanilla lifecycle API](#vanilla-lifecycle-api)
20. [Migration from VidPlus](#migration-from-vidplus)
21. [Error handling](#error-handling)
22. [TypeScript](#typescript)
23. [SSR and Next.js](#ssr-and-nextjs)
24. [Security](#security)
25. [Content Security Policy](#content-security-policy)
26. [Privacy](#privacy)
27. [Accessibility](#accessibility)
28. [Performance](#performance)
29. [Troubleshooting](#troubleshooting)
30. [Project structure](#project-structure)
31. [Development](#development)
32. [Build system](#build-system)
33. [CI](#ci)
34. [Publishing](#publishing)
35. [Versioning](#versioning)
36. [Roadmap](#roadmap)
37. [FAQ](#faq)
38. [Third-party and legal notice](#third-party-and-legal-notice)
39. [Contributing](#contributing)
40. [License](#license)

---

# Overview

`vidplus-movie-player` is a small TypeScript library that wraps VidUp's iframe embed URLs behind one consistent API.

It can:

- Build VidUp movie URLs.
- Build VidUp TV episode URLs.
- Accept IMDb IDs.
- Accept numeric TMDB IDs.
- Add supported VidUp playback/player query parameters.
- Render a responsive iframe in React.
- Render a responsive iframe in Next.js.
- Render a responsive iframe in Vue 3.
- Mount a responsive iframe from Vanilla JavaScript.
- Generate the URL without rendering anything.
- Produce ESM and CommonJS builds.
- Produce a browser global bundle.
- Generate TypeScript declaration files.

The package does **not**:

- Host movies or TV shows.
- Proxy VidUp traffic.
- Resolve direct HLS/video URLs.
- Download media.
- Scrape content.
- Fetch TMDB metadata.
- Fetch IMDb metadata.
- Replace VidUp's player.
- Guarantee that a title exists upstream.

It is an iframe integration layer.

---

# Features

- Framework-independent TypeScript core.
- VidUp-native URL generation.
- Movie support.
- TV episode support.
- IMDb ID support.
- TMDB ID support.
- Exact VidUp camelCase query parameter names.
- `autoPlay` support.
- `autoNext` support.
- `nextButton` support.
- `startAt` support.
- `theme` support.
- `sub` support.
- `lang` support.
- `chromecast` support.
- `poster` support.
- `title` support.
- Future-friendly `extraParams`.
- React / Next.js component.
- Vue 3 component.
- Vanilla DOM API.
- Browser global build.
- Responsive `16 / 9` wrapper.
- Custom aspect ratios.
- Lazy iframe loading by default.
- Fullscreen enabled by default.
- Configurable iframe title.
- TypeScript declarations.
- ESM `.mjs` builds.
- CommonJS `.cjs` builds.
- Optional React dependency.
- Optional Vue dependency.
- No React/Vue dependency in the core.
- Backward-compatible `buildVidPlusUrl()` alias that now generates VidUp URLs.

---

# VidUp URL formats

The project follows VidUp's public movie/TV path model.

## Movie

Format:

```text
https://vidup.to/movie/{ID}
```

IMDb example:

```text
https://vidup.to/movie/tt0480249
```

TMDB example:

```text
https://vidup.to/movie/27205
```

With autoplay:

```text
https://vidup.to/movie/tt0480249?autoPlay=true
```

---

## TV

Format:

```text
https://vidup.to/tv/{ID}/{SEASON}/{EPISODE}
```

Example:

```text
https://vidup.to/tv/1396/1/1
```

With options:

```text
https://vidup.to/tv/1396/1/1?autoPlay=true&autoNext=true&nextButton=true
```

TV requires both:

- `season`
- `episode`

---

# Supported IDs

VidUp movie and TV paths can be used with IMDb or TMDB identifiers.

## IMDb

IMDb IDs are strings such as:

```text
tt0480249
```

Usage:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
/>
```

---

## TMDB

TMDB IDs are normally numeric:

```text
27205
```

Usage:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
/>
```

You can also pass a numeric ID as a string:

```tsx
<MoviePlayer
  type="movie"
  id="27205"
/>
```

The library does not perform an IMDb-to-TMDB or TMDB-to-IMDb conversion.

It passes the ID to VidUp.

---

# Installation

## npm

```bash
npm install vidplus-movie-player
```

React application:

```bash
npm install vidplus-movie-player react react-dom
```

Vue application:

```bash
npm install vidplus-movie-player vue
```

---

## pnpm

```bash
pnpm add vidplus-movie-player
```

---

## Yarn

```bash
yarn add vidplus-movie-player
```

---

## Directly from GitHub

Before an npm release, or when testing the latest `main`:

```bash
npm install github:migtam628/vidplus-movie-player
```

Or clone it:

```bash
git clone https://github.com/migtam628/vidplus-movie-player.git
cd vidplus-movie-player
npm install
npm run build
```

---

# Package entry points

## Root

```ts
import {
  buildVidUpUrl,
  getIframeAttrs,
  createMoviePlayer,
} from 'vidplus-movie-player';
```

---

## React / Next.js

```tsx
import { MoviePlayer } from 'vidplus-movie-player/react';
```

---

## Vue 3

```ts
import { MoviePlayer } from 'vidplus-movie-player/vue';
```

---

## Vanilla

```ts
import {
  createMoviePlayer,
  buildVidUpUrl,
} from 'vidplus-movie-player/vanilla';
```

---

# Quick start

## Movie with IMDb ID

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  autoPlay
/>
```

Generated URL:

```text
https://vidup.to/movie/tt0480249?autoPlay=true
```

---

## Movie with TMDB ID

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  autoPlay={false}
  theme="00D4FF"
/>
```

---

## TV episode

```tsx
<MoviePlayer
  type="tv"
  id={1396}
  season={1}
  episode={1}
  autoPlay
  autoNext
  nextButton
/>
```

---

## Resume at 2 minutes

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  startAt={120}
/>
```

---

# React

Use the React subpath:

```tsx
import { MoviePlayer } from 'vidplus-movie-player/react';

export default function WatchMovie() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto' }}>
      <MoviePlayer
        type="movie"
        id="tt0480249"
        autoPlay={false}
        theme="E50914"
        sub="en"
        chromecast={false}
        poster
        title
        titleAttr="I Am Legend — VidUp player"
      />
    </main>
  );
}
```

---

## React TV example

```tsx
import { MoviePlayer } from 'vidplus-movie-player/react';

export default function WatchEpisode() {
  return (
    <MoviePlayer
      type="tv"
      id={1396}
      season={1}
      episode={1}
      autoPlay={false}
      autoNext
      nextButton
      theme="FFD60A"
      sub="en"
      titleAttr="TV episode — VidUp player"
    />
  );
}
```

---

## React custom styling

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  aspectRatio="21/9"
  className="my-player"
  style={{
    borderRadius: 18,
    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
  }}
/>
```

`className`, `style`, and `aspectRatio` affect the local wrapper only.

They are not sent to VidUp.

---

# Next.js

The React adapter works in Next.js.

```tsx
import { MoviePlayer } from 'vidplus-movie-player/react';

export default function WatchPage() {
  return (
    <main>
      <MoviePlayer
        type="movie"
        id="tt0480249"
        autoPlay={false}
        theme="E50914"
        titleAttr="VidUp movie player"
      />
    </main>
  );
}
```

The component does not depend on React state or effects.

Whether your surrounding Next.js component needs `'use client'` depends on the rest of your application.

---

## Next.js dynamic route example

Suppose the page receives:

```text
/watch/movie/tt0480249
```

You can pass the route ID directly:

```tsx
<MoviePlayer
  type="movie"
  id={params.id}
/>
```

For TV:

```tsx
<MoviePlayer
  type="tv"
  id={params.id}
  season={Number(params.season)}
  episode={Number(params.episode)}
/>
```

---

# Vue 3

Use the Vue subpath:

```vue
<script setup lang="ts">
import { MoviePlayer } from 'vidplus-movie-player/vue';
</script>

<template>
  <MoviePlayer
    type="movie"
    id="tt0480249"
    :auto-play="false"
    theme="E50914"
    sub="en"
    :chromecast="false"
    title-attr="VidUp movie player"
  />
</template>
```

Vue templates normally use kebab-case for camelCase props:

| TypeScript prop | Vue template |
|---|---|
| `autoPlay` | `auto-play` |
| `autoNext` | `auto-next` |
| `nextButton` | `next-button` |
| `startAt` | `start-at` |
| `allowFullScreen` | `allow-full-screen` |
| `titleAttr` | `title-attr` |
| `extraParams` | `extra-params` |

---

## Vue TV example

```vue
<MoviePlayer
  type="tv"
  :id="1396"
  :season="1"
  :episode="1"
  :auto-play="true"
  :auto-next="true"
  :next-button="true"
  theme="00D4FF"
/>
```

---

## Optional Vue booleans

Vue normally turns an omitted Boolean prop into `false`.

That is not always what we want for upstream URL configuration.

An omitted parameter should generally remain omitted, allowing VidUp to apply its own upstream default.

The Vue adapter therefore sets optional Boolean parameters to `undefined` when omitted.

This:

```vue
<MoviePlayer
  type="movie"
  id="tt0480249"
/>
```

does **not** automatically become:

```text
?autoPlay=false&chromecast=false&poster=false&title=false
```

---

# Vanilla JavaScript

HTML:

```html
<div id="player"></div>
```

JavaScript:

```js
import { createMoviePlayer } from 'vidplus-movie-player/vanilla';

const player = createMoviePlayer('#player', {
  type: 'movie',
  id: 'tt0480249',
  autoPlay: false,
  theme: 'E50914',
  sub: 'en',
});
```

---

## Update an existing Vanilla player

```js
player.update({
  startAt: 120,
  theme: '00D4FF',
});
```

This rebuilds the iframe URL.

---

## Destroy

```js
player.destroy();
```

---

# Browser / CDN build

The build produces:

```text
dist/vanilla.browser.js
```

The browser global is:

```text
VidUpMoviePlayer
```

Example after a package release:

```html
<div id="player"></div>

<script src="https://unpkg.com/vidplus-movie-player@1.0.0/dist/vanilla.browser.js"></script>
<script>
  VidUpMoviePlayer.createMoviePlayer('#player', {
    type: 'movie',
    id: 'tt0480249',
    autoPlay: false,
    theme: 'E50914'
  });
</script>
```

For production, pin a specific package version.

Do not rely on a moving `latest` URL if reproducibility matters.

---

# HTML-only embed

You do not need this package for a one-off static iframe.

Movie:

```html
<div style="position:relative;width:100%;aspect-ratio:16/9;background:#000">
  <iframe
    src="https://vidup.to/movie/tt0480249?autoPlay=true&theme=E50914"
    style="position:absolute;inset:0;width:100%;height:100%;border:0"
    allowfullscreen
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    title="VidUp movie player"
  ></iframe>
</div>
```

TV:

```html
<iframe
  src="https://vidup.to/tv/1396/1/1?autoPlay=true&autoNext=true&nextButton=true"
  allowfullscreen
  title="VidUp TV player"
></iframe>
```

---

# Core URL builder

The preferred builder is:

```ts
buildVidUpUrl()
```

Import:

```ts
import { buildVidUpUrl } from 'vidplus-movie-player';
```

Movie:

```ts
const url = buildVidUpUrl({
  type: 'movie',
  id: 'tt0480249',
  autoPlay: true,
});

console.log(url);
```

Result:

```text
https://vidup.to/movie/tt0480249?autoPlay=true
```

---

## TV URL builder

```ts
const url = buildVidUpUrl({
  type: 'tv',
  id: 1396,
  season: 1,
  episode: 1,
  autoPlay: true,
  autoNext: true,
  nextButton: true,
});
```

Result:

```text
https://vidup.to/tv/1396/1/1?autoPlay=true&autoNext=true&nextButton=true
```

---

## Backward compatibility alias

The original project exported:

```ts
buildVidPlusUrl()
```

For migration safety it still exists:

```ts
import { buildVidPlusUrl } from 'vidplus-movie-player';

const url = buildVidPlusUrl({
  type: 'movie',
  id: 'tt0480249',
});
```

However, it now returns a **VidUp URL**.

It is deprecated.

New code should use:

```ts
buildVidUpUrl()
```

---

# API reference

## `buildVidUpUrl(options)`

Signature:

```ts
function buildVidUpUrl(options: MoviePlayerOptions): string
```

Purpose:

- Validate content addressing.
- Build the movie/TV path.
- Serialize VidUp query parameters.
- Preserve VidUp parameter casing.
- Omit undefined values.
- Encode path/query values.

---

## `getIframeAttrs(options)`

```ts
import { getIframeAttrs } from 'vidplus-movie-player';

const attrs = getIframeAttrs({
  type: 'movie',
  id: 'tt0480249',
});
```

Returns values for:

- `allow`
- `allowFullScreen`
- `loading`
- `referrerPolicy`
- `title`

These configure the local iframe.

---

## `createMoviePlayer(container, options)`

Creates and mounts a VidUp iframe wrapper in the browser.

```js
const player = createMoviePlayer('#player', {
  type: 'movie',
  id: 'tt0480249',
});
```

Returns:

```ts
interface VanillaPlayerInstance {
  element: HTMLDivElement;
  iframe: HTMLIFrameElement;
  destroy(): void;
  update(options: Partial<MoviePlayerOptions>): void;
}
```

---

# VidUp query parameters

The library exposes a focused typed set of VidUp parameters and an `extraParams` escape hatch.

## Playback

### `autoPlay`

Type:

```ts
boolean
```

Example:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  autoPlay
/>
```

URL:

```text
?autoPlay=true
```

Case matters.

The package does not rewrite this to `autoplay`.

---

### `autoNext`

Type:

```ts
boolean
```

Most relevant for TV.

```tsx
<MoviePlayer
  type="tv"
  id={1396}
  season={1}
  episode={1}
  autoNext
/>
```

---

### `nextButton`

Type:

```ts
boolean
```

Example:

```tsx
<MoviePlayer
  type="tv"
  id={1396}
  season={1}
  episode={1}
  nextButton={false}
/>
```

---

### `startAt`

Type:

```ts
number
```

Value is intended as a playback position in seconds.

Example:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  startAt={300}
/>
```

URL:

```text
?startAt=300
```

---

# Player appearance/options

## `theme`

Type:

```ts
string
```

Typical usage:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  theme="E50914"
/>
```

Use the format expected by VidUp.

Common integrations use a hex color without the leading `#`.

---

## `poster`

Type:

```ts
boolean
```

Example:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  poster
/>
```

---

## `title`

Type:

```ts
boolean
```

Example:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  title={false}
/>
```

---

## `chromecast`

Type:

```ts
boolean
```

Example:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  chromecast={false}
/>
```

---

# Subtitle / language options

## `sub`

Type:

```ts
string
```

Example:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  sub="en"
/>
```

---

## `lang`

Type:

```ts
string
```

Example:

```ts
{
  lang: 'en'
}
```

The exact upstream effect can depend on VidUp's current player behavior.

---

# Extra parameters

VidUp may add or change player options faster than this package releases.

Use:

```ts
extraParams
```

for parameters that are not yet first-class typed properties.

Example:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  extraParams={{
    someFutureOption: true,
    anotherOption: 'value',
  }}
/>
```

Generated query keys are preserved exactly.

The package does **not** lowercase `extraParams` keys.

That matters because VidUp's public parameters include mixed-case names.

---

# Local-only options

These do not become VidUp query parameters.

| Option | Type | Default | Purpose |
|---|---|---|---|
| `className` | `string` | `''` | Wrapper class |
| `style` | `Record<string, string \| number>` | `{}` | Wrapper style |
| `aspectRatio` | `string` | `'16/9'` | CSS aspect ratio |
| `allowFullScreen` | `boolean` | `true` | Fullscreen permission |
| `titleAttr` | `string` | `'VidUp Player'` | Accessible iframe title |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Loading mode |

---

# URL serialization rules

## Undefined values are omitted

```ts
buildVidUpUrl({
  type: 'movie',
  id: 'tt0480249',
  autoPlay: undefined,
});
```

does not add `autoPlay`.

---

## Boolean values are explicit

```ts
autoPlay: true
```

becomes:

```text
autoPlay=true
```

```ts
autoPlay: false
```

becomes:

```text
autoPlay=false
```

---

## VidUp casing is preserved

This is correct:

```text
autoPlay
autoNext
nextButton
startAt
```

The library intentionally does **not** transform those into:

```text
autoplay
autonext
nextbutton
startat
```

That behavior is one of the major differences from the original VidPlus implementation.

---

# Responsive layout

Default wrapper behavior:

```css
.vidup-movie-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
}

.vidup-movie-player iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
```

---

## Cinematic ratio

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  aspectRatio="21/9"
/>
```

---

## 4:3

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  aspectRatio="4/3"
/>
```

---

# Vanilla lifecycle API

## Create

```js
const player = createMoviePlayer('#player', {
  type: 'movie',
  id: 'tt0480249',
});
```

## Wrapper element

```js
player.element
```

## Iframe

```js
player.iframe
```

## Update

```js
player.update({
  startAt: 120,
  theme: '00D4FF',
});
```

## Move to another TV episode

```js
player.update({
  type: 'tv',
  id: 1396,
  season: 1,
  episode: 2,
  autoNext: true,
});
```

## Destroy

```js
player.destroy();
```

---

# Migration from VidPlus

The original implementation used VidPlus-specific URLs and options.

This version is intentionally different.

## Base URL

Old:

```text
https://player.vidplus.to/embed
```

New:

```text
https://vidup.to
```

---

## Movie

Old:

```text
https://player.vidplus.to/embed/movie/27205
```

New:

```text
https://vidup.to/movie/27205
```

or:

```text
https://vidup.to/movie/tt0480249
```

---

## TV

Old:

```text
https://player.vidplus.to/embed/tv/94997/1/1
```

New:

```text
https://vidup.to/tv/94997/1/1
```

---

## Parameter migration

| Old VidPlus property | VidUp property |
|---|---|
| `autoplay` | `autoPlay` |
| `autonext` | `autoNext` |
| `nextbutton` | `nextButton` |
| `progress` | `startAt` |
| `primarycolor` | use VidUp `theme` where appropriate |
| `poster` | `poster` |
| `title` | `title` |
| `chromecast` | `chromecast` |

VidPlus-only fields were removed from the typed API.

---

## Removed first-class options

The VidPlus version exposed options such as:

- `secondarycolor`
- `iconcolor`
- `icons`
- `font`
- `fontcolor`
- `fontsize`
- `opacity`
- `logourl`
- `watchparty`
- `download`
- `server`
- `servericon`
- `setting`
- `pip`
- `episodelist`
- many `hide...` properties

They are no longer first-class VidUp options in this package.

If VidUp documents a parameter that is not yet typed, use `extraParams`.

---

## Anime

The original VidPlus wrapper modeled an anime/AniList route.

The VidUp-focused API in this repository currently exposes:

```ts
type ContentType = 'movie' | 'tv';
```

Anime is not included as a first-class route.

Do not assume the old VidPlus anime path exists on VidUp.

---

## Builder migration

Old code:

```ts
import { buildVidPlusUrl } from 'vidplus-movie-player';
```

Preferred new code:

```ts
import { buildVidUpUrl } from 'vidplus-movie-player';
```

The old function remains as a deprecated alias temporarily.

---

# Error handling

## Missing type or ID

```text
[vidplus-movie-player] "type" and "id" are required
```

---

## Missing TV season or episode

```text
[vidplus-movie-player] "season" and "episode" are required for type "tv"
```

---

## Unknown type

Only:

```text
movie
tv
```

are accepted by the current typed API.

---

## Missing Vanilla container

```js
createMoviePlayer('#not-found', options);
```

throws a container-not-found error.

---

# TypeScript

Types:

```ts
import type {
  ContentType,
  MediaId,
  ExtraVidUpParams,
  MoviePlayerOptions,
  MoviePlayerProps,
  VanillaPlayerInstance,
} from 'vidplus-movie-player';
```

---

## ContentType

```ts
type ContentType = 'movie' | 'tv';
```

---

## MediaId

```ts
type MediaId = string | number;
```

Examples:

```ts
const imdb: MediaId = 'tt0480249';
const tmdb: MediaId = 27205;
```

---

## MoviePlayerOptions

Example:

```ts
const options: MoviePlayerOptions = {
  type: 'movie',
  id: 'tt0480249',
  autoPlay: false,
  startAt: 60,
  theme: 'E50914',
  sub: 'en',
  chromecast: false,
};
```

---

# SSR and Next.js

`buildVidUpUrl()` does not access `window` or `document`.

It can be called during server rendering.

Example:

```ts
const src = buildVidUpUrl({
  type: 'movie',
  id: 'tt0480249',
});
```

The Vanilla adapter does access `document`.

Therefore:

```ts
createMoviePlayer()
```

must run in a browser.

---

# Security

VidUp is embedded as a third-party iframe.

Treat:

```text
https://vidup.to
```

as an external trust boundary.

The default iframe permissions are:

```text
accelerometer;
autoplay;
clipboard-write;
encrypted-media;
gyroscope;
picture-in-picture;
web-share
```

Fullscreen is enabled by default.

The default referrer policy is:

```text
strict-origin-when-cross-origin
```

---

## User-controlled extraParams

Do not blindly pass arbitrary user input into `extraParams`.

Although `URLSearchParams` safely serializes values into the query string, application-level policy still matters.

Whitelist options when appropriate.

---

## No direct-stream resolving

This project intentionally does not resolve VidUp's internal media servers or decrypt direct stream URLs.

It only builds the public embed URL and renders it.

---

# Content Security Policy

If your site uses a strict CSP, you may need:

```text
frame-src https://vidup.to;
```

Depending on your CSP version/setup you may also need an appropriate `child-src` fallback.

Do not replace your existing CSP with this one line.

Merge VidUp into your existing policy intentionally.

---

# Privacy

A third-party iframe can expose request/context information to the external service, including potentially:

- IP address
- browser/user-agent information
- timing information
- cookies/storage associated with the external origin
- referrer data as permitted by browser policy
- player interaction data controlled by the provider

Review VidUp's current privacy/terms behavior for your deployment.

This package does not proxy or anonymize the iframe.

---

# Accessibility

The iframe receives a title.

Default:

```text
VidUp Player
```

Prefer a content-specific title:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  titleAttr="I Am Legend video player"
/>
```

The wrapper cannot independently guarantee accessibility of controls rendered inside the third-party iframe.

---

# Performance

## Lazy loading

Default:

```ts
loading: 'lazy'
```

Override:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  loading="eager"
/>
```

---

## Keep options stable

Changing a VidUp URL can cause the iframe to reload.

In React/Vue, avoid needlessly changing player props.

In Vanilla, call `update()` only when the player URL or local wrapper configuration actually needs to change.

---

# Troubleshooting

## I still see player.vidplus.to

You are probably using an older build or older copied source.

Current core constant:

```ts
VIDUP_BASE_URL = 'https://vidup.to'
```

Current generated movie URL should begin:

```text
https://vidup.to/movie/
```

---

## My old autoplay prop stopped working

Old:

```tsx
autoplay
```

New:

```tsx
autoPlay
```

VidUp parameter casing is preserved.

---

## autoPlay=true does not actually autoplay

Browser autoplay policy can still block playback.

The query parameter requests autoplay from VidUp.

It cannot override Chrome, Safari, Firefox, iOS, Android, or user browser settings.

---

## TV throws an error

TV needs:

```ts
season
episode
```

Example:

```tsx
<MoviePlayer
  type="tv"
  id={1396}
  season={1}
  episode={1}
/>
```

---

## IMDb ID does not load

Verify the ID format.

Typical IMDb title ID:

```text
tt0480249
```

The package does not verify that the ID exists.

---

## TMDB ID does not load

The package can build a valid URL with a numeric TMDB ID, but content availability is controlled upstream.

---

## Theme does not apply

Use the value format expected by VidUp.

A common form is:

```text
E50914
```

rather than:

```text
#E50914
```

---

## CSP blocks the iframe

Look for a console error mentioning:

```text
frame-src
```

Allow the VidUp origin in the relevant CSP directive.

---

## CDN global is undefined

The global is now:

```js
VidUpMoviePlayer
```

not:

```js
VidPlusMoviePlayer
```

---

# Project structure

```text
vidplus-movie-player/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   └── feature_request.yml
│   ├── workflows/
│   │   └── ci.yml
│   └── pull_request_template.md
├── examples/
│   ├── nextjs-example.tsx
│   ├── react-example.tsx
│   ├── vanilla.html
│   └── vue-example.vue
├── scripts/
│   └── build.js
├── src/
│   ├── core.ts
│   ├── index.ts
│   ├── react.tsx
│   ├── types.ts
│   ├── vanilla.ts
│   └── vue.ts
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── package.json
└── tsconfig.json
```

---

# Development

Clone:

```bash
git clone https://github.com/migtam628/vidplus-movie-player.git
cd vidplus-movie-player
```

Install:

```bash
npm install
```

Type-check:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

Inspect the npm package:

```bash
npm run pack:check
```

Clean:

```bash
npm run clean
```

---

# Build system

Build tooling:

- TypeScript
- esbuild

Entries:

```text
src/index.ts
src/react.tsx
src/vue.ts
src/vanilla.ts
```

Outputs include:

```text
dist/index.mjs
dist/index.cjs
dist/index.d.ts

dist/react.mjs
dist/react.cjs
dist/react.d.ts

dist/vue.mjs
dist/vue.cjs
dist/vue.d.ts

dist/vanilla.mjs
dist/vanilla.cjs
dist/vanilla.d.ts

dist/vanilla.browser.js
```

---

## Browser global

```text
VidUpMoviePlayer
```

---

# CI

GitHub Actions verifies the project on:

- Node.js 18
- Node.js 20
- Node.js 22

The CI workflow runs:

```bash
npm install --ignore-scripts
npm run typecheck
npm run build
npm run pack:check
```

for pushes and pull requests targeting `main`.

---

# Publishing

Before publishing:

```bash
npm install
npm run typecheck
npm run build
npm run pack:check
```

Then:

```bash
npm login
npm publish
```

The package includes:

```json
"prepublishOnly": "npm run typecheck && npm run build"
```

so publication triggers a fresh validation/build.

---

# Package naming

The current package/repository is:

```text
vidplus-movie-player
```

The implementation is now VidUp-based.

This name is retained in the current repository to avoid changing GitHub paths and breaking code that already references the project.

A future major release could rename the npm package/repository to something like:

```text
vidup-movie-player
```

if desired.

That would be a packaging/repository migration, separate from the runtime-provider migration already completed here.

---

# Versioning

The project follows Semantic Versioning where practical:

```text
MAJOR.MINOR.PATCH
```

Changes to an unaffiliated upstream provider can also require compatibility releases.

See:

[CHANGELOG.md](CHANGELOG.md)

---

# Roadmap

Potential improvements:

- Unit tests for every URL combination.
- Explicit test fixtures for IMDb IDs.
- Explicit test fixtures for TMDB IDs.
- URL snapshot tests.
- Validation for negative season/episode numbers.
- Theme/color validation.
- Subtitle/language enums if VidUp publishes stable values.
- Additional typed VidUp parameters as documentation evolves.
- Dedicated Vite React example.
- Dedicated Vite Vue example.
- Full Next.js App Router demo.
- Svelte adapter.
- Solid adapter.
- Web Component adapter.
- npm release automation.
- npm provenance.
- GitHub Release automation.
- Dependabot/Renovate.
- API documentation generation.
- Optional custom iframe permission configuration.
- Optional sandbox presets.

---

# FAQ

## Is this using VidPlus?

No.

The runtime provider is:

```text
https://vidup.to
```

The old VidPlus base URL has been removed from the runtime implementation.

---

## Why does the repo name still say vidplus?

Compatibility.

The repository was created under that name before the provider migration.

The package can be renamed separately later.

---

## What is the official upstream documentation?

Use:

https://vidup.to/#documentation

That should be treated as the primary upstream reference when changing VidUp URL formats and parameters.

---

## Does it support IMDb IDs?

Yes.

Example:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
/>
```

---

## Does it support TMDB IDs?

Yes.

Example:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
/>
```

---

## Does it support anime?

Not as a first-class content path in the current VidUp-oriented API.

The old VidPlus AniList/anime route was intentionally removed.

---

## Does it fetch metadata?

No.

---

## Does it provide direct m3u8 URLs?

No.

---

## Does it proxy streams?

No.

---

## Can I render my own iframe?

Yes.

Use:

```ts
buildVidUpUrl()
```

and optionally:

```ts
getIframeAttrs()
```

---

## Can I use a parameter that is not typed yet?

Yes.

Use:

```ts
extraParams
```

---

## Does buildVidPlusUrl still work?

Yes, temporarily.

It is a deprecated alias for:

```ts
buildVidUpUrl
```

and now generates VidUp URLs.

---

## Can I disable fullscreen?

Yes.

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  allowFullScreen={false}
/>
```

---

## Can I resume playback?

Use:

```tsx
startAt={seconds}
```

Example:

```tsx
<MoviePlayer
  type="movie"
  id="tt0480249"
  startAt={600}
/>
```

---

# Third-party and legal notice

This repository is an independent integration project.

It is not presented as an official VidUp SDK.

No affiliation or endorsement by VidUp is implied.

The project:

- does not host media,
- does not upload media,
- does not redistribute media,
- does not resolve direct video streams,
- does not decrypt player traffic,
- does not proxy HLS/video segments.

Users and deployers are responsible for complying with:

- applicable laws,
- copyright requirements,
- content-distribution rights,
- third-party service terms,
- privacy requirements,
- TMDB/IMDb requirements when those services are used separately.

VidUp can change its service, URLs, parameters, availability, or player behavior independently of this project.

---

# Contributing

See:

[CONTRIBUTING.md](CONTRIBUTING.md)

When changing embed behavior:

1. Check VidUp's current documentation.
2. Do not copy VidPlus-only behavior into VidUp code.
3. Preserve parameter casing.
4. Add/update documentation.
5. Run type checking.
6. Run the build.
7. Inspect package output.

Commands:

```bash
npm run typecheck
npm run build
npm run pack:check
```

---

# Security policy

See:

[SECURITY.md](SECURITY.md)

---

# License

MIT © 2026 Miguel Tamayo.

See:

[LICENSE](LICENSE)

---

# Links

- **VidUp:** https://vidup.to/
- **VidUp documentation:** https://vidup.to/#documentation
- **Repository:** https://github.com/migtam628/vidplus-movie-player
- **Issues:** https://github.com/migtam628/vidplus-movie-player/issues

---

## Current runtime summary

```text
Provider: VidUp
Base URL: https://vidup.to
Movies:   /movie/{IMDb-or-TMDB-ID}
TV:       /tv/{IMDb-or-TMDB-ID}/{season}/{episode}
Builder:  buildVidUpUrl()
React:    vidplus-movie-player/react
Vue:      vidplus-movie-player/vue
Vanilla:  vidplus-movie-player/vanilla
```

The runtime integration is now VidUp-first.
