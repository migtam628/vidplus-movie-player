# Contributing

Contributions are welcome through issues and pull requests.

## Upstream reference

The project targets VidUp:

- https://vidup.to/
- https://vidup.to/#documentation

When changing URL formats or query parameters, prefer the current VidUp documentation over legacy VidPlus behavior.

## Development

```bash
git clone https://github.com/migtam628/vidplus-movie-player.git
cd vidplus-movie-player
npm install
npm run typecheck
npm run build
```

## Before opening a pull request

1. Keep framework-independent behavior in `src/core.ts` and `src/types.ts`.
2. Avoid adding a hard React or Vue dependency to the root entry point.
3. Preserve VidUp parameter casing exactly; do not lowercase `autoPlay`, `autoNext`, `nextButton`, or `startAt`.
4. Preserve the rule that optional query parameters are omitted unless explicitly provided.
5. Keep local iframe/layout props out of the VidUp query string.
6. Run `npm run typecheck`, `npm run build`, and `npm run pack:check`.
7. Add or update documentation for public API changes.
8. Use a focused commit message and describe compatibility impact in the pull request.

## Reporting bugs

Include the framework, package version, browser/runtime, content type, media ID type (IMDb or TMDB), a minimal configuration object, expected behavior, actual behavior, generated VidUp URL when safe to share, and any console error.

Do not post private credentials, access tokens, or sensitive user data.
