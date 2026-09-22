# Contributing

Contributions are welcome through issues and pull requests.

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
3. Preserve the rule that optional query parameters are omitted unless explicitly provided.
4. Run `npm run typecheck`, `npm run build`, and `npm run pack:check`.
5. Add or update documentation for any public API change.
6. Use a focused commit message and describe compatibility impact in the pull request.

## Reporting bugs

Include the framework, package version, browser/runtime, content type, a minimal configuration object, expected behavior, actual behavior, and any console error. Do not post private credentials, access tokens, or sensitive user data.
