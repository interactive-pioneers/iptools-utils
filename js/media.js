const cache = {
  mediaQueriesString: null,
  mediaQueriesArray: null,
  mediaQueriesObject: {}
}

const updateMediaQueries = () => {
  const mediaQueriesString = getComputedStyle(document.documentElement).getPropertyValue('--iptUtilsMediaQueries');

  if (mediaQueriesString !== cache.mediaQueriesString) {
    cache.mediaQueriesString = mediaQueriesString.replaceAll('"', '');
    cache.mediaQueriesArray = cache.mediaQueriesString.split('__').map((string) => string.split('|'));

    const newMediaQueriesObject = {};
    for (const [name, query] of cache.mediaQueriesArray) {
      if (name && query) {
        newMediaQueriesObject[name] = window.matchMedia(query);
      }
    }
    cache.mediaQueriesObject = newMediaQueriesObject;
  }
}

export const media = {
  isTouchDevice: () => (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    ('msMaxTouchPoints' in navigator && navigator.msMaxTouchPoints > 0)),
  isIos: () => ([
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
    'iOS'
  ].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)),
  isAndroid: () => navigator.platform === 'Android',
  isIPhone: () => ([
    'iPhone Simulator',
    'iPhone',
    'iOS'
  ].includes(navigator.platform)),
  isMobile: () => (
    media.isIos() ||
    media.isAndroid() ||
    /* eslint-disable max-len */
    /(android|bb\d+)|bada\/|blackberry|iemobile|ip(hone|od)|kindle|mmp|mobile.+firefox|opera m(ob|in)i|palm( os)?|phone|symbian|wap|windows ce|xda/ui.test((navigator.userAgent || navigator.vendor || window.opera))),
  /* eslint-enable max-len */
  isMediaQuery: (mediaQueryName) => {
    updateMediaQueries();
    if (cache.mediaQueriesObject.hasOwnProperty(mediaQueryName)) {
      return cache.mediaQueriesObject[mediaQueryName].matches;
    } else {
      throw new Error('Media query ' + mediaQueryName + ' does not exist.');
    }
  },
  getMediaQueries: () => {
    updateMediaQueries();
    return Object.fromEntries(Object.entries(cache.mediaQueriesObject)
      .map(([name, matchMedia]) => [name, matchMedia.matches]));
  }
};
