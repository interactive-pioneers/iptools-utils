/**
 * Returns a list of namespaced events
 * @param {(String|String[])} eventNames - valid event name
 * @param {String} namespace - valid namespace for events
 * @returns {String} list of namespaced events
 */
export const getNamespacedEvents = (eventNames, namespace) => {
  if (!(eventNames instanceof Array) && typeof eventNames !== 'string') {
    throw new Error('Parameter eventNames is not of type Array or String');
  }

  if (typeof namespace !== 'string' || namespace.includes(' ')) {
    throw new Error('Parameter namespace is not of type String or contains spaces');
  }

  if (typeof eventNames === 'string') {
    eventNames = [eventNames];
  }

  return eventNames.map((eventName) => {
    if (typeof eventName !== 'string' || eventName.includes(' ')) {
      throw new Error(`Event name "${eventName.toString()}" is not of type String or contains spaces`);
    }
    return `${namespace}.${eventName}`;
  }).join(' ');
};
