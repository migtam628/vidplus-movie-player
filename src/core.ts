import type { MoviePlayerOptions } from './types';

export const VIDUP_BASE_URL = 'https://vidup.to';

/**
 * Builds a fully-qualified VidUp embed URL.
 *
 * Movie:
 *   https://vidup.to/movie/{IMDb-or-TMDB-ID}
 *
 * TV:
 *   https://vidup.to/tv/{IMDb-or-TMDB-ID}/{season}/{episode}
 *
 * VidUp query parameter names are intentionally preserved with their documented
 * casing (for example autoPlay, autoNext, nextButton and startAt).
 */
export function buildVidUpUrl(options: MoviePlayerOptions): string {
  const { type, id, season, episode } = options;

  if (!type || id === undefined || id === null || String(id).trim() === '') {
    throw new Error('[vidplus-movie-player] "type" and "id" are required');
  }

  let path: string;

  switch (type) {
    case 'movie':
      path = `/movie/${encodeURIComponent(String(id))}`;
      break;

    case 'tv':
      if (season == null || episode == null) {
        throw new Error(
          '[vidplus-movie-player] "season" and "episode" are required for type "tv"'
        );
      }

      path =
        `/tv/${encodeURIComponent(String(id))}` +
        `/${encodeURIComponent(String(season))}` +
        `/${encodeURIComponent(String(episode))}`;
      break;

    default:
      throw new Error(
        `[vidplus-movie-player] Unknown type "${String(type)}". Use "movie" or "tv".`
      );
  }

  const search = new URLSearchParams();

  const set = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;

    if (typeof value === 'boolean') {
      search.set(key, value ? 'true' : 'false');
      return;
    }

    search.set(key, String(value));
  };

  // Preserve VidUp's parameter names and casing.
  set('autoPlay', options.autoPlay);
  set('autoNext', options.autoNext);
  set('nextButton', options.nextButton);
  set('startAt', options.startAt);
  set('theme', options.theme);
  set('sub', options.sub);
  set('lang', options.lang);
  set('chromecast', options.chromecast);
  set('poster', options.poster);
  set('title', options.title);

  if (options.extraParams) {
    for (const [key, value] of Object.entries(options.extraParams)) {
      set(key, value);
    }
  }

  const query = search.toString();
  return `${VIDUP_BASE_URL}${path}${query ? `?${query}` : ''}`;
}

/**
 * Backward-compatible alias for code written against the original VidPlus
 * version of this repository. It now generates VidUp URLs.
 *
 * @deprecated Use buildVidUpUrl().
 */
export const buildVidPlusUrl = buildVidUpUrl;

/**
 * Returns recommended iframe attributes for accessibility and common playback
 * capabilities. These affect the local iframe, not VidUp's query parameters.
 */
export function getIframeAttrs(options: MoviePlayerOptions) {
  return {
    allow:
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    allowFullScreen: options.allowFullScreen !== false,
    loading: options.loading || 'lazy',
    referrerPolicy: 'strict-origin-when-cross-origin' as const,
    title: options.titleAttr || 'VidUp Player',
  };
}
