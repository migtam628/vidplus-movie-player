/**
 * vidplus-movie-player
 *
 * The repository/package name is retained for compatibility, while the runtime
 * integration now targets VidUp (https://vidup.to).
 *
 * Framework adapters are exposed through subpath exports so importing the root
 * package does not require React or Vue at runtime.
 */

export {
  VIDUP_BASE_URL,
  buildVidUpUrl,
  buildVidPlusUrl,
  getIframeAttrs,
} from './core';

export { createMoviePlayer } from './vanilla';

export type {
  ContentType,
  MediaId,
  ExtraVidUpParams,
  MoviePlayerOptions,
  MoviePlayerProps,
} from './types';

export type { VanillaPlayerInstance } from './vanilla';
