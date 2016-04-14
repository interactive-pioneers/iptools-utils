/*jshint -W098 */

'use strict';

var iptUtils = function() {

  // private property
  //var myPrivateProperty = 'foo';

  // private method
  /*var myPrivateMethod = function() {};*/

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
        throw new Error('parameter events is not of type Array or String');
      }
      if (typeof events === 'string' && (events.indexOf(' ') !== -1 || events.indexOf('.') !== -1)) {
        throw new Error('parameter events is invalid, contains " " or "."');
      }
      if (events instanceof Array) {
        events.map(function(event) {
          if (typeof event !== 'string' || (event.indexOf(' ') !== -1 || event.indexOf('.') !== -1)) {
            throw new Error('parameter events is invalid, contains " " or "."');
          }
        });
      }
      if (typeof namespace !== 'string') {
        throw new Error('parameter namespace is not of String');
      }
      if (namespace.indexOf(' ') !== -1 || namespace.indexOf('.') !== -1) {
        throw new Error('parameter namespace is invalid, contains " " or "."');
      }

      return events instanceof Array ?
        events.join('.' + namespace + ' ') + '.' + namespace
        : events + '.' + namespace;
    }

  };

}();
