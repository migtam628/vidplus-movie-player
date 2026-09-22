import { buildVidPlusUrl, getIframeAttrs } from './core';
import type { MoviePlayerProps } from './types';

/**
 * React / Next.js MoviePlayer component.
 *
 * @example
 * <MoviePlayer type="movie" id={27205} primarycolor="00D4FF" />
 *
 * @example
 * <MoviePlayer type="tv" id={94997} season={1} episode={1} icons="netflix" />
 */
export function MoviePlayer(props: MoviePlayerProps) {
  const {
    className = '',
    style = {},
    aspectRatio = '16/9',
    ...rest
  } = props;

  const src = buildVidPlusUrl(props);
  const iframeAttrs = getIframeAttrs(props);

  return (
    <div
      className={`vidplus-movie-player ${className}`.trim()}
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
