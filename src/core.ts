import type { MoviePlayerOptions } from './types';

const BASE_URL = 'https://player.vidplus.to/embed';

/**
 * Builds a fully-qualified VidPlus embed URL from the given options.
 * Throws if required fields for the content type are missing.
 */
export function buildVidPlusUrl(options: MoviePlayerOptions): string {
  const { type, id, season, episode, dub, ...rest } = options;

  if (!type || !id) {
    throw new Error('[vidplus-movie-player] "type" and "id" are required');
  }

  let path: string;

  switch (type) {
    case 'movie':
      path = `/movie/${id}`;
      break;
    case 'tv':
      if (season == null || episode == null) {
        throw new Error('[vidplus-movie-player] "season" and "episode" are required for type "tv"');
      }
      path = `/tv/${id}/${season}/${episode}`;
      break;
    case 'anime':
      if (episode == null) {
        throw new Error('[vidplus-movie-player] "episode" is required for type "anime"');
      }
      path = `/anime/${id}/${episode}`;
      break;
    default:
      throw new Error(`[vidplus-movie-player] Unknown type "${type}". Use "movie", "tv" or "anime".`);
  }

  const params = new URLSearchParams();

  const set = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;
    if (typeof value === 'boolean') {
      params.set(key, value ? 'true' : 'false');
    } else {
      params.set(key, String(value));
    }
  };

  if (type === 'anime' && dub !== undefined) {
    set('dub', dub);
  }

  const layoutKeys = new Set([
    'className',
    'style',
    'aspectRatio',
    'allowFullScreen',
    'titleAttr',
    'loading',
  ]);

  for (const [key, value] of Object.entries(rest)) {
    if (layoutKeys.has(key)) continue;
    set(key.toLowerCase(), value);
  }

  const query = params.toString();
  return `${BASE_URL}${path}${query ? `?${query}` : ''}`;
}

/**
 * Returns the recommended iframe attributes for accessibility & security.
 */
export function getIframeAttrs(options: MoviePlayerOptions) {
  return {
    allow:
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    allowFullScreen: options.allowFullScreen !== false,
    loading: options.loading || 'lazy',
    referrerPolicy: 'strict-origin-when-cross-origin' as const,
    title: options.titleAttr || 'VidPlus Player',
  };
}
