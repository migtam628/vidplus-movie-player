import { defineComponent, computed, h, type PropType } from 'vue';
import { buildVidPlusUrl, getIframeAttrs } from './core';
import type { MoviePlayerProps, ContentType, IconStyle } from './types';

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
    dub: optionalBoolean(),
    autoplay: optionalBoolean(),
    autonext: optionalBoolean(),
    nextbutton: optionalBoolean(),
    progress: Number,
    primarycolor: String,
    secondarycolor: String,
    iconcolor: String,
    poster: optionalBoolean(),
    title: optionalBoolean(),
    icons: String as PropType<IconStyle>,
    font: String,
    fontcolor: String,
    fontsize: Number,
    opacity: Number,
    logourl: String,
    chromecast: optionalBoolean(),
    watchparty: optionalBoolean(),
    download: optionalBoolean(),
    server: [String, Number],
    servericon: optionalBoolean(),
    setting: optionalBoolean(),
    pip: optionalBoolean(),
    episodelist: optionalBoolean(),
    hideprimarycolor: optionalBoolean(),
    hidesecondarycolor: optionalBoolean(),
    hideiconcolor: optionalBoolean(),
    hideprogresscontrol: optionalBoolean(),
    hideiconset: optionalBoolean(),
    hideautonext: optionalBoolean(),
    hideautoplay: optionalBoolean(),
    hidenextbutton: optionalBoolean(),
    hideposter: optionalBoolean(),
    hidetitle: optionalBoolean(),
    hidechromecast: optionalBoolean(),
    hideepisodelist: optionalBoolean(),
    hideservericon: optionalBoolean(),
    hidepip: optionalBoolean(),
    className: String,
    style: Object as PropType<Record<string, string | number>>,
    aspectRatio: { type: String, default: '16/9' },
    allowFullScreen: { type: Boolean, default: true },
    titleAttr: String,
    loading: String as PropType<'lazy' | 'eager'>,
  },
  setup(props) {
    const src = computed(() => buildVidPlusUrl(props as MoviePlayerProps));
    const iframeAttrs = computed(() => getIframeAttrs(props as MoviePlayerProps));

    return () =>
      h(
        'div',
        {
          class: ['vidplus-movie-player', props.className].filter(Boolean).join(' '),
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
