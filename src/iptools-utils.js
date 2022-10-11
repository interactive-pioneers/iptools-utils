/*jshint -W098 */
(function() {

  'use strict';

  var iptUtils = function() {
    // private properties
    const htmlNode = document.querySelector('html');

    const cache = {
      windowWidth: -1,
      windowHeight: -1,
      mediaQueries: null,
      detectedMediaQueries: null
    };

    const classes = {
      isTouch: 'is-touch',
      enableHover: 'hover',
      isIPhone: 'is-iphone',
      mediaQueriesDetector: 'media-queries-detector'
    };

    const selectors = {
      mediaQueriesDetector: '.media-queries-detector'
    };

    // private methods

    const createMediaQueriesDetector = function() {
      const container = document.createElement('div');
      container.classList.add(classes.mediaQueriesDetector);
      document.querySelector('body').appendChild(container);

      return container;
    };

    const getMediaQueriesArray = () => {
      if (!cache.mediaQueries) {
        let mediaQueriesDetector = document.querySelector(selectors.mediaQueriesDetector);

        if (!(mediaQueriesDetector instanceof HTMLElement)) {
          mediaQueriesDetector = createMediaQueriesDetector();
        }

        if (!('mediaQueryNames' in mediaQueriesDetector)) {
          mediaQueriesDetector.mediaQueryNames = window.getComputedStyle(
            mediaQueriesDetector,
            '::before'
          )
            .getPropertyValue('content')
            .replace(/'*"*/g, '')
            .split('|');
        }

        if (!('mediaQueryDefinitions' in mediaQueriesDetector)) {
          mediaQueriesDetector.mediaQueryDefinitions = window.getComputedStyle(
            mediaQueriesDetector,
            '::after'
          )
            .getPropertyValue('content')
            .replace(/'*"*/g, '')
            .split('|');
        }

        cache.mediaQueries = {};

        for (let i = 0; i < mediaQueriesDetector.mediaQueryNames.length; i++) {
          cache.mediaQueries[mediaQueriesDetector.mediaQueryNames[i]] = mediaQueriesDetector.mediaQueryDefinitions[i];
        }
      }

      return cache.mediaQueries;
    };

    const isTouchDevice = function() {
      return 'ontouchstart' in window || !!navigator.maxTouchPoints;
    };

    const isMobile = function() {
      return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test((navigator.userAgent||navigator.vendor||window.opera))||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substring(0,4));
    };

    const isIPhone = function() {
      let platform = '';

      if ('platform' in navigator) {
        platform = navigator.platform;
      }

      if ('userAgentData' in navigator) {
        platform = navigator.userAgentData.platform;
      }

      return platform === 'iPhone';
    };

    const toggleHoverAbility = function(force) {
      const toggle = typeof force !== 'undefined' ?
        !!force :
        htmlNode.classList.contains(classes.enableHover);

      htmlNode.classList.toggle(classes.enableHover, toggle);
    };

    htmlNode.classList.toggle(classes.isTouch, !!isTouchDevice());
    htmlNode.classList.toggle(classes.isIPhone, !!isIPhone());
    toggleHoverAbility(!isTouchDevice());

    // public API
    return {

      // public property
      //myPublicProperty: 'foo',

      /**
       * Returns a list of namespaced events
       * @param {(String|String[])} events - valid event name
       * @param {String} namespace - valid namespace for events
       * @returns {String} list of namespaced events
       */
      getNamespacedEvents: function(events, namespace) {
        if (!(events instanceof Array) && typeof events !== 'string') {
          console.log(typeof events);
          throw new Error('parameter events is not of type Array or String');
        }
        if (typeof events === 'string' && (events.indexOf(' ') !== -1 || events.indexOf('.') !== -1)) {
          console.log(2);
          throw new Error('parameter events is invalid, contains " " or "."');
        }
        if (events instanceof Array) {
          console.log(3);
          events.map(function(event) {
            if (typeof event !== 'string' || (event.indexOf(' ') !== -1 || event.indexOf('.') !== -1)) {
              console.log(4);
              throw new Error('parameter events is invalid, contains " " or "."');
            }
          });
        }
        if (typeof namespace !== 'string') {
          console.log(5);
          throw new Error('parameter namespace is not of String');
        }
        if (namespace.indexOf(' ') !== -1 || namespace.indexOf('.') !== -1) {
          console.log(6);
          throw new Error('parameter namespace is invalid, contains " " or "."');
        }

        console.log(7);

        return events instanceof Array ?
          events.join('.' + namespace + ' ') + '.' + namespace :
          events + '.' + namespace;
      },

      deviceDetection: {
        isTouchDevice: !!isTouchDevice(),
        isIPhone: !!isIPhone(),
        isMobile: !!isMobile(),

        toggleHoverAbility: function(force) {
          toggleHoverAbility(force);
        },

        /**
         * Returns a list of existing and active media queries
         * @returns {Object} list of existing media queries with boolean value denoting their active status
         */
        getMediaQueries: function() {
          const existingMediaQueries = getMediaQueriesArray();

          if (
            !cache.detectedMediaQueries ||
            window.innerWidth !== cache.windowWidth ||
            window.innerHeight !== cache.windowHeight
          ) {
            cache.windowWidth = window.innerWidth;
            cache.windowHeight = window.innerHeight;
            cache.detectedMediaQueries = Object.fromEntries(Object.entries(existingMediaQueries)
              .map(([key, value]) => {
                return [key, (matchMedia(value)).matches];
              })
            );
          }

          return cache.detectedMediaQueries;
        },

        /**
         * Returns whether a given media query is currently active
         * @returns {Boolean} active status of the provided media query
         */
        isMediaQuery: function(mediaQuery) {
          var currentMediaQueries = this.getMediaQueries();
          var isActive = false;

          if (mediaQuery in currentMediaQueries) {
            isActive = currentMediaQueries[mediaQuery];
          } else {
            throw new Error('Media query ' + mediaQuery + ' does not exist.');
          }
          return isActive;
        }
      }
    };
  };
  window.iptUtils = iptUtils();

})();
