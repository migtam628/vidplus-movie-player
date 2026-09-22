import { buildVidUpUrl, getIframeAttrs } from './core';
import type { MoviePlayerProps } from './types';

/**
 * React / Next.js MoviePlayer component backed by VidUp.
 *
 * @example
 * <MoviePlayer type="movie" id="tt0480249" autoPlay theme="E50914" />
 *
 * @example
 * <MoviePlayer
 *   type="tv"
 *   id={1396}
 *   season={1}
 *   episode={1}
 *   autoPlay
 *   autoNext
 *   nextButton
 * />
 */
export function MoviePlayer(props: MoviePlayerProps) {
  const {
    className = '',
    style = {},
    aspectRatio = '16/9',
  } = props;

  const src = buildVidUpUrl(props);
  const iframeAttrs = getIframeAttrs(props);

  return (
    <div
      className={`vidup-movie-player ${className}`.trim()}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        backgroundColor: '#000',
        ...style,
      }}
    >
      <iframe
        src={src}
        {...iframeAttrs}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
      />
    </div>
  );
}

export default MoviePlayer;
export type { MoviePlayerProps };
