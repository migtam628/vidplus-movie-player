export type ContentType = 'movie' | 'tv';

export type MediaId = string | number;

export type ExtraVidUpParams = Record<string, string | number | boolean>;

export interface MoviePlayerOptions {
  /** Content type supported by VidUp's public embed URLs. */
  type: ContentType;

  /**
   * IMDb ID (for example "tt0480249") or numeric TMDB ID.
   * VidUp supports both forms for movie and TV embed URLs.
   */
  id: MediaId;

  /** Required when type="tv". */
  season?: number;

  /** Required when type="tv". */
  episode?: number;

  // VidUp playback parameters

  /** Request automatic playback. Serialized as VidUp's `autoPlay` parameter. */
  autoPlay?: boolean;

  /** Request automatic progression to the next TV episode. */
  autoNext?: boolean;

  /** Show or hide the next-episode button for TV content. */
  nextButton?: boolean;

  /** Start playback at a position in seconds. */
  startAt?: number;

  // VidUp appearance / player parameters

  /** VidUp theme color, normally a hex value without "#", e.g. "E50914". */
  theme?: string;

  /** Preferred subtitle language/code passed to VidUp. */
  sub?: string;

  /** Preferred language value passed to VidUp when supported upstream. */
  lang?: string;

  /** Enable or disable Chromecast UI/functionality upstream. */
  chromecast?: boolean;

  /** Show or hide poster artwork upstream. */
  poster?: boolean;

  /** Show or hide the title upstream. */
  title?: boolean;

  /**
   * Additional VidUp query parameters.
   *
   * Keys are preserved exactly as supplied. This is intentionally an escape
   * hatch for new VidUp parameters that may be added before this package ships
   * a typed option for them.
   */
  extraParams?: ExtraVidUpParams;

  // Local iframe/layout options. These are never sent to VidUp.

  /** CSS class for the local wrapper. */
  className?: string;

  /** Inline styles for the local wrapper. */
  style?: Record<string, string | number>;

  /** CSS aspect-ratio value. Default: "16/9". */
  aspectRatio?: string;

  /** Allow iframe fullscreen. Default: true. */
  allowFullScreen?: boolean;

  /** Accessible iframe title. Default: "VidUp Player". */
  titleAttr?: string;

  /** Iframe loading strategy. Default: "lazy". */
  loading?: 'lazy' | 'eager';
}

export type MoviePlayerProps = MoviePlayerOptions;
