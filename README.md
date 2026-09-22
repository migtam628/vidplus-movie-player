# VidPlus Movie Player

> A typed, framework-friendly wrapper for building and embedding VidPlus movie, TV, and anime players in React, Next.js, Vue 3, Vanilla JavaScript, TypeScript, and plain HTML projects.

[![CI](https://github.com/migtam628/vidplus-movie-player/actions/workflows/ci.yml/badge.svg)](https://github.com/migtam628/vidplus-movie-player/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)

**Repository:** https://github.com/migtam628/vidplus-movie-player

---

## Overview

`vidplus-movie-player` is a lightweight integration layer around the VidPlus iframe player.

It gives applications one consistent API for:

- Movies identified by a **TMDB movie ID**
- TV episodes identified by a **TMDB TV ID + season + episode**
- Anime episodes identified by an **AniList ID + episode**
- React
- Next.js
- Vue 3
- Vanilla JavaScript
- TypeScript
- CDN / script-tag usage
- Direct embed URL generation without rendering a component

The package does **not** host video files, proxy streaming traffic, scrape media, or implement a video engine. It builds a VidPlus embed URL and provides responsive iframe wrappers around that URL.

The core is intentionally framework-independent. React and Vue are optional adapters exposed through separate package entry points, so using the core or Vanilla APIs does not require either framework.

---

## Table of contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Supported content types](#supported-content-types)
4. [Installation](#installation)
5. [Package entry points](#package-entry-points)
6. [Quick start](#quick-start)
7. [React](#react)
8. [Next.js](#nextjs)
9. [Vue 3](#vue-3)
10. [Vanilla JavaScript](#vanilla-javascript)
11. [CDN / browser global](#cdn--browser-global)
12. [HTML-only embed](#html-only-embed)
13. [Core URL builder](#core-url-builder)
14. [Complete option reference](#complete-option-reference)
15. [URL behavior](#url-behavior)
16. [Responsive layout and styling](#responsive-layout-and-styling)
17. [Vanilla lifecycle API](#vanilla-lifecycle-api)
18. [Error handling](#error-handling)
19. [TypeScript](#typescript)
20. [SSR and hydration](#ssr-and-hydration)
21. [Security](#security)
22. [Content Security Policy](#content-security-policy)
23. [Privacy](#privacy)
24. [Accessibility](#accessibility)
25. [Performance](#performance)
26. [Troubleshooting](#troubleshooting)
27. [Project structure](#project-structure)
28. [Development](#development)
29. [Build system](#build-system)
30. [Publishing](#publishing)
31. [Versioning](#versioning)
32. [Roadmap](#roadmap)
33. [FAQ](#faq)
34. [Third-party and legal notice](#third-party-and-legal-notice)
35. [Contributing](#contributing)
36. [License](#license)

---

# Features

- Framework-agnostic TypeScript core.
- Strongly typed `movie`, `tv`, and `anime` content modes.
- Movie embed URL generation from a TMDB ID.
- TV embed URL generation from TMDB ID, season, and episode.
- Anime embed URL generation from AniList ID and episode.
- Anime dub query support.
- Typed playback options.
- Typed appearance options.
- Typed server and feature options.
- Typed hide-control flags.
- Responsive iframe wrappers.
- Default `16 / 9` aspect ratio.
- Configurable CSS `aspect-ratio`.
- React / Next.js component.
- Vue 3 component.
- Vanilla DOM API.
- CDN/browser IIFE build.
- ESM output using explicit `.mjs`.
- CommonJS output using `.cjs`.
- TypeScript declaration output.
- Optional React and Vue peer dependencies.
- Lazy iframe loading by default.
- Fullscreen support by default.
- Accessibility title support.
- Sensible iframe `allow` policy.
- `strict-origin-when-cross-origin` referrer policy.
- Vanilla `update()` and `destroy()` methods.
- Layout-only options are never sent to VidPlus.
- `undefined` and `null` options are omitted from the query string.
- Booleans are serialized explicitly as `true` or `false`.
- Vue Boolean props preserve omission as `undefined` instead of silently forcing upstream options to `false`.

---

# Architecture

The package is divided into a small core plus framework adapters.

```text
MoviePlayerOptions
       |
       v
+-------------------+
| buildVidPlusUrl() |
+-------------------+
       |
       v
VidPlus embed URL
       |
       +-------------------+-------------------+-------------------+
       |                   |                   |                   |
       v                   v                   v                   v
     React               Vue 3              Vanilla            Your UI
   component           component             adapter          / iframe
```

The important design rule is that the root package does not import React or Vue.

That means this is valid in a non-framework project:

```ts
import { buildVidPlusUrl } from 'vidplus-movie-player';
```

without requiring React or Vue to be installed at runtime.

Framework adapters are explicit:

```ts
import { MoviePlayer } from 'vidplus-movie-player/react';
```

```ts
import { MoviePlayer } from 'vidplus-movie-player/vue';
```

---

# Supported content types

## Movie

A movie requires:

- `type: 'movie'`
- a TMDB movie ID

Example:

```ts
{
  type: 'movie',
  id: 27205
}
```

Generated path:

```text
https://player.vidplus.to/embed/movie/27205
```

---

## TV

A TV episode requires:

- `type: 'tv'`
- a TMDB TV ID
- `season`
- `episode`

Example:

```ts
{
  type: 'tv',
  id: 94997,
  season: 1,
  episode: 1
}
```

Generated path:

```text
https://player.vidplus.to/embed/tv/94997/1/1
```

The URL builder throws when season or episode is missing.

---

## Anime

An anime episode requires:

- `type: 'anime'`
- an AniList ID
- `episode`

Example:

```ts
{
  type: 'anime',
  id: 21,
  episode: 1
}
```

Generated path:

```text
https://player.vidplus.to/embed/anime/21/1
```

Dub preference can also be supplied:

```ts
{
  type: 'anime',
  id: 21,
  episode: 1,
  dub: true
}
```

---

# Installation

## From npm

Once the package is published:

```bash
npm install vidplus-movie-player
```

With pnpm:

```bash
pnpm add vidplus-movie-player
```

With Yarn:

```bash
yarn add vidplus-movie-player
```

## Directly from GitHub

During development or before the npm release:

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

| Entry point | Purpose |
|---|---|
| `vidplus-movie-player` | Core URL helpers plus Vanilla creator |
| `vidplus-movie-player/react` | React / Next.js MoviePlayer |
| `vidplus-movie-player/vue` | Vue 3 MoviePlayer |
| `vidplus-movie-player/vanilla` | Explicit Vanilla entry |

## Root/core

```ts
import {
  buildVidPlusUrl,
  getIframeAttrs,
  createMoviePlayer,
} from 'vidplus-movie-player';
```

## React

```tsx
import { MoviePlayer } from 'vidplus-movie-player/react';
```

## Vue

```ts
import { MoviePlayer } from 'vidplus-movie-player/vue';
```

## Vanilla

```ts
import { createMoviePlayer } from 'vidplus-movie-player/vanilla';
```

---

# Quick start

## Movie

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  primarycolor="00D4FF"
  autoplay={false}
/>
```

## TV

```tsx
<MoviePlayer
  type="tv"
  id={94997}
  season={1}
  episode={1}
  primarycolor="B20710"
  secondarycolor="170000"
  icons="netflix"
/>
```

## Anime

```tsx
<MoviePlayer
  type="anime"
  id={21}
  episode={1}
  dub
  autoplay={false}
/>
```

---

# React

Install React if your application does not already include it:

```bash
npm install react react-dom
```

Use the React-specific entry point:

```tsx
import { MoviePlayer } from 'vidplus-movie-player/react';

export default function MoviePage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto' }}>
      <MoviePlayer
        type="movie"
        id={27205}
        primarycolor="00D4FF"
        iconcolor="FFFFFF"
        autoplay={false}
        titleAttr="Movie player"
      />
    </main>
  );
}
```

The component renders:

1. A responsive wrapper `div`.
2. An absolutely positioned iframe.
3. A generated VidPlus URL.
4. Recommended iframe attributes.

No CSS framework is required.

### Custom wrapper styling

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  className="cinema-player"
  aspectRatio="21/9"
  style={{
    borderRadius: 16,
    overflow: 'hidden',
  }}
/>
```

---

# Next.js

The React adapter can be used in Next.js.

```tsx
import { MoviePlayer } from 'vidplus-movie-player/react';

export default function WatchPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <MoviePlayer
        type="tv"
        id={94997}
        season={1}
        episode={1}
        autoplay={false}
        primarycolor="FFD60A"
        titleAttr="Episode player"
      />
    </main>
  );
}
```

The component itself does not use React state, effects, localStorage, or browser event listeners.

Whether your page needs `'use client'` depends on the surrounding Next.js application and what else that component does.

A standalone example is included in:

```text
examples/nextjs-example.tsx
```

---

# Vue 3

Install Vue:

```bash
npm install vue
```

Then:

```vue
<script setup lang="ts">
import { MoviePlayer } from 'vidplus-movie-player/vue';
</script>

<template>
  <MoviePlayer
    type="movie"
    :id="27205"
    primarycolor="00D4FF"
    :autoplay="false"
    title-attr="Movie player"
  />
</template>
```

TV example:

```vue
<MoviePlayer
  type="tv"
  :id="94997"
  :season="1"
  :episode="1"
  primarycolor="FFD60A"
  icons="lucide"
  :autoplay="false"
/>
```

## Why optional Vue booleans are special

Vue normally casts an omitted Boolean prop to `false`.

That behavior is undesirable for this package because an omitted option should usually remain omitted and allow VidPlus to apply its own upstream default.

For example, this:

```vue
<MoviePlayer type="movie" :id="27205" />
```

should not automatically become:

```text
...?autoplay=false&poster=false&chromecast=false...
```

The Vue adapter therefore explicitly uses `default: undefined` for optional query-string booleans.

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
  id: 27205,
  primarycolor: '6C63FF',
  autoplay: false,
});
```

The returned instance contains:

```ts
interface VanillaPlayerInstance {
  element: HTMLDivElement;
  iframe: HTMLIFrameElement;
  update: (options: Partial<MoviePlayerOptions>) => void;
  destroy: () => void;
}
```

Update it:

```js
player.update({
  progress: 120,
  primarycolor: '00D4FF',
});
```

Remove it:

```js
player.destroy();
```

---

# CDN / browser global

The build generates:

```text
dist/vanilla.browser.js
```

It exposes:

```js
VidPlusMoviePlayer
```

After an npm release, an unpkg-style example is:

```html
<div id="player"></div>

<script src="https://unpkg.com/vidplus-movie-player@1.0.0/dist/vanilla.browser.js"></script>
<script>
  VidPlusMoviePlayer.createMoviePlayer('#player', {
    type: 'movie',
    id: 27205,
    primarycolor: '00D4FF',
    autoplay: false
  });
</script>
```

Pin a package version in production rather than relying on a moving `latest` tag.

---

# HTML-only embed

For a single static player, you may not need this package at all.

```html
<div style="position:relative;width:100%;aspect-ratio:16/9;background:#000">
  <iframe
    src="https://player.vidplus.to/embed/movie/27205?primarycolor=00D4FF&autoplay=true"
    style="position:absolute;inset:0;width:100%;height:100%;border:0"
    allowfullscreen
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    title="Movie player"
  ></iframe>
</div>
```

The package is most useful when you need reusable configuration, typing, validation, multiple frameworks, or dynamic content.

---

# Core URL builder

## `buildVidPlusUrl(options)`

```ts
import { buildVidPlusUrl } from 'vidplus-movie-player';

const src = buildVidPlusUrl({
  type: 'movie',
  id: 27205,
  primarycolor: '00D4FF',
  autoplay: false,
});

console.log(src);
```

Result:

```text
https://player.vidplus.to/embed/movie/27205?primarycolor=00D4FF&autoplay=false
```

## TV

```ts
const src = buildVidPlusUrl({
  type: 'tv',
  id: 94997,
  season: 1,
  episode: 1,
});
```

## Anime

```ts
const src = buildVidPlusUrl({
  type: 'anime',
  id: 21,
  episode: 1,
  dub: true,
});
```

---

## `getIframeAttrs(options)`

The package also exposes the recommended iframe attribute object:

```ts
import { getIframeAttrs } from 'vidplus-movie-player';

const attrs = getIframeAttrs({
  type: 'movie',
  id: 27205,
  titleAttr: 'Inception player',
});
```

It returns values corresponding to:

- `allow`
- `allowFullScreen`
- `loading`
- `referrerPolicy`
- `title`

This is useful when you want to render the iframe yourself while still using the package defaults.

---

# Complete option reference

The following table describes the options modeled by this package. Upstream VidPlus behavior can change independently of this repository.

## Content

| Option | Type | Required | Applies to | Description |
|---|---|---:|---|---|
| `type` | `'movie' \| 'tv' \| 'anime'` | Yes | All | Content mode |
| `id` | `string \| number` | Yes | All | TMDB ID for movie/TV or AniList ID for anime |
| `season` | `number` | TV | TV | Season number |
| `episode` | `number` | TV/Anime | TV, Anime | Episode number |
| `dub` | `boolean` | No | Anime | Dub preference |

## Playback

| Option | Type | Description |
|---|---|---|
| `autoplay` | `boolean` | Requests automatic playback |
| `autonext` | `boolean` | Requests automatic next-episode behavior |
| `nextbutton` | `boolean` | Controls next-episode button behavior |
| `progress` | `number` | Requested start position in seconds |

## Appearance

| Option | Type | Description |
|---|---|---|
| `primarycolor` | `string` | Primary player color; use hex without `#` |
| `secondarycolor` | `string` | Secondary/progress color |
| `iconcolor` | `string` | Icon color |
| `poster` | `boolean` | Poster visibility |
| `title` | `boolean` | Content title visibility |
| `icons` | `'default' \| 'netflix' \| 'vid' \| 'lucide' \| 'tb'` | Icon set |
| `font` | `string` | Font family |
| `fontcolor` | `string` | Font/subtitle color |
| `fontsize` | `number` | Font size |
| `opacity` | `number` | Font/background opacity value |
| `logourl` | `string` | Custom logo URL |

Example:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  primarycolor="FACC15"
  secondarycolor="111827"
  iconcolor="FFFFFF"
  icons="lucide"
  font="Inter"
  fontcolor="FFFFFF"
  fontsize={18}
  opacity={0.8}
/>
```

## Features

| Option | Type | Description |
|---|---|---|
| `chromecast` | `boolean` | Chromecast control preference |
| `watchparty` | `boolean` | Watch-party feature preference |
| `download` | `boolean` | Download feature preference |
| `server` | `string \| number` | Preferred upstream server |
| `servericon` | `boolean` | Server-selection icon preference |
| `setting` | `boolean` | Settings control preference |
| `pip` | `boolean` | Picture-in-picture preference |
| `episodelist` | `boolean` | Episode-list preference |

## Hide/control options

All of these are optional booleans:

- `hideprimarycolor`
- `hidesecondarycolor`
- `hideiconcolor`
- `hideprogresscontrol`
- `hideiconset`
- `hideautonext`
- `hideautoplay`
- `hidenextbutton`
- `hideposter`
- `hidetitle`
- `hidechromecast`
- `hideepisodelist`
- `hideservericon`
- `hidepip`

Example:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  hideautoplay
  hidechromecast
  hidepip
/>
```

## Layout and iframe options

These options affect the local wrapper or iframe and are **not** added to the VidPlus query string.

| Option | Type | Default | Purpose |
|---|---|---|---|
| `className` | `string` | `''` | Wrapper class |
| `style` | `Record<string, string \| number>` | `{}` | Wrapper inline style |
| `aspectRatio` | `string` | `'16/9'` | CSS aspect ratio |
| `allowFullScreen` | `boolean` | `true` | Fullscreen permission |
| `titleAttr` | `string` | `'VidPlus Player'` | Accessible iframe title |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Iframe loading strategy |

---

# URL behavior

The URL builder follows a few deliberate rules.

## Undefined values are omitted

```ts
buildVidPlusUrl({
  type: 'movie',
  id: 27205,
  autoplay: undefined,
});
```

does not append `autoplay`.

## Null values are omitted

The serializer also ignores `null` at runtime.

## Booleans are explicit

```ts
autoplay: true
```

becomes:

```text
autoplay=true
```

and:

```ts
autoplay: false
```

becomes:

```text
autoplay=false
```

## Layout keys never leak upstream

These are intentionally excluded from the query string:

- `className`
- `style`
- `aspectRatio`
- `allowFullScreen`
- `titleAttr`
- `loading`

## Parameter names are lowercase

Package option keys are serialized to lowercase, matching the URL parameter naming used by the integration.

## Upstream defaults are not hard-coded

If you do not provide an optional player query value, this package generally leaves it out.

That keeps this wrapper from unnecessarily overriding VidPlus behavior and reduces coupling to upstream defaults that may change.

---

# Responsive layout and styling

The default wrapper is equivalent to:

```css
.vidplus-movie-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
}

.vidplus-movie-player iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
```

Change the ratio:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  aspectRatio="21/9"
/>
```

Square:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  aspectRatio="1/1"
/>
```

With Tailwind around the component:

```tsx
<div className="mx-auto max-w-6xl overflow-hidden rounded-2xl shadow-2xl">
  <MoviePlayer type="movie" id={27205} />
</div>
```

---

# Vanilla lifecycle API

`createMoviePlayer()` returns a stable object so a non-framework application can control the player.

```js
const player = createMoviePlayer('#player', {
  type: 'tv',
  id: 94997,
  season: 1,
  episode: 1,
});
```

## Access the wrapper

```js
player.element
```

## Access the iframe

```js
player.iframe
```

## Update configuration

```js
player.update({
  episode: 2,
  progress: 0,
});
```

The URL is rebuilt after an update.

## Destroy

```js
player.destroy();
```

This removes the wrapper from the DOM.

---

# Error handling

The core throws descriptive errors for invalid content addressing.

## Missing type or ID

```text
[vidplus-movie-player] "type" and "id" are required
```

## Missing TV season or episode

```text
[vidplus-movie-player] "season" and "episode" are required for type "tv"
```

## Missing anime episode

```text
[vidplus-movie-player] "episode" is required for type "anime"
```

## Unknown type

The TypeScript type system should prevent this in typed code, and runtime validation protects JavaScript callers.

## Missing Vanilla target

```js
createMoviePlayer('#does-not-exist', options);
```

throws a container-not-found error.

---

# TypeScript

The package is authored in TypeScript and generates declarations for all public entry points.

Core types:

```ts
import type {
  ContentType,
  IconStyle,
  MoviePlayerOptions,
  MoviePlayerProps,
} from 'vidplus-movie-player';
```

Vanilla instance:

```ts
import type { VanillaPlayerInstance } from 'vidplus-movie-player';
```

Example reusable configuration:

```ts
import type { MoviePlayerOptions } from 'vidplus-movie-player';

const movieOptions: MoviePlayerOptions = {
  type: 'movie',
  id: 27205,
  primarycolor: '00D4FF',
  autoplay: false,
};
```

---

# SSR and hydration

The core URL builder is deterministic and does not require the DOM.

That makes this safe in server code:

```ts
const src = buildVidPlusUrl({
  type: 'movie',
  id: 27205,
});
```

The Vanilla DOM adapter requires `document`, so call it only in a browser context.

React/Next.js and Vue SSR behavior depends on how your application renders third-party iframes and what framework boundary you place around the component.

For hydration stability:

- Keep initial options deterministic.
- Do not generate different IDs on server and client.
- Avoid reading browser-only state during server render.
- Move browser-specific logic to the appropriate client lifecycle when necessary.

---

# Security

This package renders a third-party iframe. Treat the upstream origin as a separate trust boundary.

The default iframe policy is:

```text
accelerometer;
autoplay;
clipboard-write;
encrypted-media;
gyroscope;
picture-in-picture;
web-share
```

Fullscreen is enabled unless explicitly disabled.

The default referrer policy is:

```text
strict-origin-when-cross-origin
```

## Custom logo URLs

If `logourl` is user-controlled, validate or restrict it before passing it into the player configuration.

## IDs and query values

The package uses `URLSearchParams` for query serialization, avoiding manual query-string concatenation.

## Iframe sandboxing

The package does not set a `sandbox` attribute by default because overly restrictive sandbox policies can break player functionality.

If your application requires sandboxing, use `buildVidPlusUrl()` and render a custom iframe with the exact policy your threat model requires.

---

# Content Security Policy

Applications with a restrictive CSP may need to allow the player origin.

A deployment may require a directive similar to:

```text
frame-src https://player.vidplus.to;
```

or an equivalent `child-src` policy for older CSP setups.

Do not blindly copy a CSP example into production. Merge it with your existing policy and only permit the origins your application actually requires.

If a custom logo or other upstream resource uses additional origins, browser console CSP violations will identify what was blocked.

---

# Privacy

Loading a third-party iframe can allow the iframe provider and its infrastructure to receive information such as:

- IP address
- browser/user-agent information
- request timing
- referrer data subject to browser/referrer policy
- cookies or storage associated with the third-party origin
- player interactions controlled by the upstream service

If your deployment has consent or privacy requirements, review the upstream service's current behavior and your applicable legal obligations.

This repository does not proxy those requests.

---

# Accessibility

Every iframe should have a meaningful title.

Default:

```text
VidPlus Player
```

Better for a specific page:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  titleAttr="Inception video player"
/>
```

Other accessibility considerations remain the responsibility of the upstream player and the application embedding it, including:

- keyboard navigation
- focus indication
- captions/subtitles
- audio description
- control labels
- contrast
- screen-reader behavior

---

# Performance

## Lazy loading

The default is:

```ts
loading: 'lazy'
```

This can reduce initial page work when the player is below the fold.

To request eager loading:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  loading="eager"
/>
```

## Avoid unnecessary remounts

In React or Vue, keep stable props where possible.

In Vanilla, prefer:

```js
player.update(...)
```

instead of destroying and recreating the DOM node for every small option change.

## Third-party performance

The wrapper is small. Most network and playback cost comes from the embedded upstream player, not this package.

---

# Troubleshooting

## Player area is blank

Check:

1. The generated iframe URL.
2. Browser developer console.
3. Network errors.
4. CSP `frame-src`.
5. Browser privacy extensions.
6. DNS/filtering software.
7. Whether the upstream service is available.
8. Whether the requested content/server is available upstream.

The wrapper cannot repair an unavailable upstream stream.

---

## Autoplay does not start

Browser autoplay policies can block automatic playback, especially with sound.

```ts
autoplay: true
```

requests autoplay from the player. It does not override Chrome, Safari, Firefox, mobile OS, or user autoplay restrictions.

---

## Color does not apply

Use the color value without `#`:

Correct:

```text
00D4FF
```

Instead of:

```text
#00D4FF
```

Actual upstream support for a parameter may change over time.

---

## TV throws a missing season/episode error

Supply both:

```tsx
<MoviePlayer
  type="tv"
  id={94997}
  season={1}
  episode={1}
/>
```

---

## Anime throws a missing episode error

Supply:

```tsx
<MoviePlayer
  type="anime"
  id={21}
  episode={1}
/>
```

---

## React is requested in a Vanilla project

Use the root or Vanilla entry:

```ts
import { createMoviePlayer } from 'vidplus-movie-player';
```

or:

```ts
import { createMoviePlayer } from 'vidplus-movie-player/vanilla';
```

Do not import the React subpath.

---

## Vue is requested in a non-Vue project

Do not import:

```text
vidplus-movie-player/vue
```

The root package does not depend on Vue at runtime.

---

## Vue omitted booleans show up as false

The initial public source addresses this by using `default: undefined` for optional Boolean player-query props.

If you encounter this behavior, verify that you are using a release that includes the fixed Vue adapter.

---

## CDN global is missing

Check that the browser bundle actually loaded before accessing:

```js
VidPlusMoviePlayer
```

Pin a valid published version and inspect the browser Network tab for 404s.

---

## Node treats ESM incorrectly

This project uses explicit `.mjs` ESM outputs and `.cjs` CommonJS outputs.

That avoids relying on ambiguous `.js` module interpretation.

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
│
├── examples/
│   ├── nextjs-example.tsx
│   ├── react-example.tsx
│   ├── vanilla.html
│   └── vue-example.vue
│
├── scripts/
│   └── build.js
│
├── src/
│   ├── core.ts
│   ├── index.ts
│   ├── react.tsx
│   ├── types.ts
│   ├── vanilla.ts
│   └── vue.ts
│
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── package.json
└── tsconfig.json
```

Generated build output is intentionally ignored by Git:

```text
dist/
├── index.mjs
├── index.cjs
├── index.d.ts
├── react.mjs
├── react.cjs
├── react.d.ts
├── vue.mjs
├── vue.cjs
├── vue.d.ts
├── vanilla.mjs
├── vanilla.cjs
├── vanilla.d.ts
└── vanilla.browser.js
```

Source maps and declaration maps may also be generated.

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

Inspect the npm package contents without publishing:

```bash
npm run pack:check
```

Clean generated output:

```bash
npm run clean
```

---

# Build system

The build uses:

- TypeScript for types/declarations.
- esbuild for JavaScript bundles.

Public logical entry points:

```text
src/index.ts
src/react.tsx
src/vue.ts
src/vanilla.ts
```

Each is bundled to ESM and CommonJS.

Example:

```text
src/react.tsx
  -> dist/react.mjs
  -> dist/react.cjs
  -> dist/react.d.ts
```

The Vanilla adapter also generates:

```text
dist/vanilla.browser.js
```

using the global:

```text
VidPlusMoviePlayer
```

## Why `.mjs`?

The package intentionally uses `.mjs` for ESM instead of depending on `"type": "module"` for the entire package.

That keeps:

- Node ESM detection explicit.
- CJS output explicit.
- the CommonJS build script simple.

---

# CI

GitHub Actions runs verification on:

- Node.js 18
- Node.js 20
- Node.js 22

For each version it performs:

```bash
npm install --ignore-scripts
npm run typecheck
npm run build
npm run pack:check
```

The workflow runs for pushes to `main` and pull requests targeting `main`.

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

The package defines:

```json
"prepublishOnly": "npm run typecheck && npm run build"
```

so a publish performs a fresh verification/build.

Before the first public release, verify:

- npm package name availability.
- package version.
- repository URLs.
- README examples.
- expected `dist/` outputs.
- no credentials or private data in the packed files.
- current upstream VidPlus parameter behavior.

---

# Versioning

The project is intended to follow Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

Examples:

- `1.0.1`: backward-compatible bug fix.
- `1.1.0`: backward-compatible new option or adapter.
- `2.0.0`: intentional public API break.

Because this package wraps an unaffiliated third-party player, an upstream service change can require a compatibility release even when this repository itself did not introduce the original break.

See [CHANGELOG.md](CHANGELOG.md).

---

# Roadmap

Possible future work:

- Unit tests for URL construction.
- Runtime validation helpers.
- Color-format validation.
- Progress/opacity range validation.
- Dedicated Vite examples.
- Full Next.js App Router demo.
- Full Vue/Vite demo.
- Svelte adapter.
- Solid adapter.
- Web Component adapter.
- Theme presets.
- Custom iframe permission configuration.
- Optional iframe sandbox presets.
- Automated npm releases.
- npm provenance.
- GitHub release workflow.
- Dependency update automation.
- API extraction/document generation.
- Event helpers if VidPlus exposes a documented cross-window messaging API.

Roadmap items are ideas, not guarantees.

---

# FAQ

## Does this repository host movies or TV episodes?

No.

It builds embed URLs and renders an iframe.

## Does it download media?

No media downloading is implemented by this wrapper.

## Does it fetch TMDB metadata?

No.

Your application is responsible for metadata and for supplying the correct TMDB ID.

## Does it fetch AniList metadata?

No.

Supply the relevant AniList ID yourself.

## Do I need a backend?

Not for basic URL construction or iframe rendering.

## Do I need React?

No.

React is only needed for the `/react` adapter.

## Do I need Vue?

No.

Vue is only needed for the `/vue` adapter.

## Can I build my own component?

Yes.

Use:

```ts
buildVidPlusUrl()
```

and optionally:

```ts
getIframeAttrs()
```

then render your own iframe.

## Can I change the aspect ratio?

Yes:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  aspectRatio="21/9"
/>
```

## Can I disable fullscreen?

Yes:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  allowFullScreen={false}
/>
```

## Can I start at a specific playback position?

The package exposes:

```ts
progress?: number
```

Example:

```tsx
<MoviePlayer
  type="movie"
  id={27205}
  progress={120}
/>
```

Actual playback behavior remains controlled by the upstream player.

## Can I choose a server?

The wrapper exposes:

```ts
server?: string | number
```

The accepted server values and availability are controlled upstream.

## Why does the package omit unspecified options?

To avoid overriding upstream defaults unnecessarily.

## Can it guarantee content availability?

No.

## Can it bypass autoplay restrictions?

No.

## Is this project affiliated with VidPlus?

No affiliation is implied.

## Is this project affiliated with TMDB or AniList?

No affiliation is implied. If your application separately uses their APIs, follow their current terms and attribution requirements.

---

# Third-party and legal notice

This repository is an independent developer integration for a third-party embed service.

It does not host, upload, proxy, redistribute, or curate media files.

Users and deployers are responsible for:

- complying with applicable laws,
- respecting copyright and content-distribution rights,
- complying with the current terms of any third-party services they use,
- reviewing privacy and cookie implications of embedded content,
- using TMDB/AniList data in accordance with the applicable terms if those services are separately integrated,
- ensuring they have the rights or permissions appropriate to their use case.

VidPlus URLs, query parameters, servers, player behavior, content availability, and service availability can change independently of this repository.

This package cannot guarantee permanent compatibility with an unaffiliated external service.

---

# Contributing

Contributions are welcome.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

A strong contribution should:

- keep core behavior framework-independent,
- avoid hard React/Vue dependencies in the root entry point,
- preserve omission of unspecified query parameters,
- include documentation for public API changes,
- pass type checking,
- pass the build,
- preserve ESM/CJS/browser outputs,
- explain any upstream compatibility assumptions.

Run:

```bash
npm run typecheck
npm run build
npm run pack:check
```

before opening a PR.

Bug and feature-request forms are available through GitHub Issues.

---

# Security policy

See [SECURITY.md](SECURITY.md).

Do not place credentials, access tokens, private API keys, or exploitable security details in a public issue.

---

# License

MIT © 2026 Miguel Tamayo.

See [LICENSE](LICENSE).

---

# Repository

**GitHub:** https://github.com/migtam628/vidplus-movie-player

**Package name:** `vidplus-movie-player`

If this project is useful, contributions, issue reports, documentation improvements, and framework examples are welcome.
