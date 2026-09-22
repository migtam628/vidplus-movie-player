import { defineComponent, computed, h, type PropType } from 'vue';
import { buildVidUpUrl, getIframeAttrs } from './core';
import type {
  MoviePlayerProps,
  ContentType,
  ExtraVidUpParams,
} from './types';

const optionalBoolean = () => ({
  type: Boolean,
  default: undefined,
});

export const MoviePlayer = defineComponent({
  name: 'MoviePlayer',
  props: {
    type: { type: String as PropType<ContentType>, required: true },
    id: { type: [String, Number], required: true },
    season: Number,
    episode: Number,

    autoPlay: optionalBoolean(),
    autoNext: optionalBoolean(),
    nextButton: optionalBoolean(),
    startAt: Number,

    theme: String,
    sub: String,
    lang: String,
    chromecast: optionalBoolean(),
    poster: optionalBoolean(),
    title: optionalBoolean(),

    extraParams: Object as PropType<ExtraVidUpParams>,

    className: String,
    style: Object as PropType<Record<string, string | number>>,
    aspectRatio: { type: String, default: '16/9' },
    allowFullScreen: { type: Boolean, default: true },
    titleAttr: String,
    loading: String as PropType<'lazy' | 'eager'>,
  },

  setup(props) {
    const src = computed(() => buildVidUpUrl(props as MoviePlayerProps));
    const iframeAttrs = computed(() =>
      getIframeAttrs(props as MoviePlayerProps)
    );

    return () =>
      h(
        'div',
        {
          class: ['vidup-movie-player', props.className]
            .filter(Boolean)
            .join(' '),
          style: {
            position: 'relative',
            width: '100%',
            aspectRatio: props.aspectRatio,
            overflow: 'hidden',
            backgroundColor: '#000',
            ...(props.style || {}),
          },
        },
        [
          h('iframe', {
            src: src.value,
            ...iframeAttrs.value,
            style: {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 0,
            },
          }),
        ]
      );
  },
});

export default MoviePlayer;
export type { MoviePlayerProps };
