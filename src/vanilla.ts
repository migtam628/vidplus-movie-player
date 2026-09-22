import { buildVidPlusUrl, getIframeAttrs } from './core';
import type { MoviePlayerOptions } from './types';

export interface VanillaPlayerInstance {
  element: HTMLDivElement;
  iframe: HTMLIFrameElement;
  destroy: () => void;
  update: (newOptions: Partial<MoviePlayerOptions>) => void;
}

/**
 * Creates a VidPlus MoviePlayer and mounts it into the given container.
 */
export function createMoviePlayer(
  container: string | HTMLElement,
  options: MoviePlayerOptions
): VanillaPlayerInstance {
  const target =
    typeof container === 'string'
      ? (document.querySelector(container) as HTMLElement | null)
      : container;

  if (!target) {
    throw new Error(`[vidplus-movie-player] Container not found: ${container}`);
  }

  let currentOptions = { ...options };

  const wrapper = document.createElement('div');
  wrapper.className = ['vidplus-movie-player', currentOptions.className]
    .filter(Boolean)
    .join(' ');

  const applyWrapperStyles = () => {
    Object.assign(wrapper.style, {
      position: 'relative',
      width: '100%',
      aspectRatio: currentOptions.aspectRatio || '16/9',
      overflow: 'hidden',
      backgroundColor: '#000',
      ...(currentOptions.style || {}),
    });
  };
  applyWrapperStyles();

  const iframe = document.createElement('iframe');
  const applyIframe = () => {
    const src = buildVidPlusUrl(currentOptions);
    const attrs = getIframeAttrs(currentOptions);

    iframe.src = src;
    iframe.title = attrs.title;
    iframe.allow = attrs.allow;
    iframe.allowFullscreen = attrs.allowFullScreen;
    iframe.loading = attrs.loading;
    iframe.referrerPolicy = attrs.referrerPolicy;

    Object.assign(iframe.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      border: '0',
    });
  };
  applyIframe();

  wrapper.appendChild(iframe);
  target.appendChild(wrapper);

  return {
    element: wrapper,
    iframe,
    destroy() {
      wrapper.remove();
    },
    update(newOptions: Partial<MoviePlayerOptions>) {
      currentOptions = { ...currentOptions, ...newOptions };
      applyWrapperStyles();
      applyIframe();
    },
  };
}

export { buildVidPlusUrl, getIframeAttrs };
export type { MoviePlayerOptions };
