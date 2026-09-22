export type ContentType = 'movie' | 'tv' | 'anime';

export type IconStyle = 'default' | 'netflix' | 'vid' | 'lucide' | 'tb';

export interface MoviePlayerOptions {
  /** Content type: 'movie' | 'tv' | 'anime' */
  type: ContentType;
  /** TMDB ID (movie/tv) or AniList ID (anime) */
  id: string | number;
  /** Required for TV shows */
  season?: number;
  /** Required for TV shows and anime */
  episode?: number;
  /** Anime only – use dubbed version (default: false) */
  dub?: boolean;

  /** Auto-start playback (default: true) */
  autoplay?: boolean;
  /** Auto-play next episode – TV/Anime only (default: true) */
  autonext?: boolean;
  /** Show next episode button – TV/Anime only (default: true) */
  nextbutton?: boolean;
  /** Start position in seconds */
  progress?: number;

  /** Primary player color (hex without #) e.g. "6C63FF" */
  primarycolor?: string;
  /** Progress bar background color (hex without #) */
  secondarycolor?: string;
  /** Player icon colors (hex without #) */
  iconcolor?: string;
  /** Show poster/thumbnail (default: true) */
  poster?: boolean;
  /** Show content title (default: true) */
  title?: boolean;
  /** Icon style */
  icons?: IconStyle;
  /** Font family e.g. "Poppins" */
  font?: string;
  /** Font/subtitle color (hex without #) */
  fontcolor?: string;
  /** Font size in pixels */
  fontsize?: number;
  /** Font background opacity 0-1 */
  opacity?: number;
  /** Custom logo URL */
  logourl?: string;

  /** Enable Chromecast (default: true) */
  chromecast?: boolean;
  /** Enable WatchParty (default: false) */
  watchparty?: boolean;
  /** Enable download */
  download?: boolean;
  /** Prefer specific server (name or number) */
  server?: string | number;
  /** Show server selection icon (default: true) */
  servericon?: boolean;
  /** Show settings icon (default: true) */
  setting?: boolean;
  /** Show picture-in-picture icon (default: true) */
  pip?: boolean;
  /** Show episode list – TV/Anime only (default: true) */
  episodelist?: boolean;

  hideprimarycolor?: boolean;
  hidesecondarycolor?: boolean;
  hideiconcolor?: boolean;
  hideprogresscontrol?: boolean;
  hideiconset?: boolean;
  hideautonext?: boolean;
  hideautoplay?: boolean;
  hidenextbutton?: boolean;
  hideposter?: boolean;
  hidetitle?: boolean;
  hidechromecast?: boolean;
  hideepisodelist?: boolean;
  hideservericon?: boolean;
  hidepip?: boolean;

  /** CSS class for the wrapper */
  className?: string;
  /** Inline styles for the wrapper */
  style?: Record<string, string | number>;
  /** Aspect ratio CSS value (default: "16/9") */
  aspectRatio?: string;
  /** Allow fullscreen (default: true) */
  allowFullScreen?: boolean;
  /** iframe title attribute for accessibility */
  titleAttr?: string;
  /** Loading strategy (default: "lazy") */
  loading?: 'lazy' | 'eager';
}

export type MoviePlayerProps = MoviePlayerOptions;
