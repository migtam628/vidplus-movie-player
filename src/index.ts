/**
 * vidplus-movie-player
 *
 * Framework-agnostic core helpers and Vanilla DOM adapter for the VidPlus
 * iframe embed player. Framework adapters are intentionally exposed through
 * subpath exports (`/react` and `/vue`) so importing the root package does not
 * require React or Vue at runtime.
 */

export { buildVidPlusUrl, getIframeAttrs } from './core';
export { createMoviePlayer } from './vanilla';
export type {
  ContentType,
  IconStyle,
  MoviePlayerOptions,
  MoviePlayerProps,
} from './types';
export type { VanillaPlayerInstance } from './vanilla';
