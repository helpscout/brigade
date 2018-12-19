/**
 * This is a factory for creating a helper for setting and unsetting listeners
 * on entities (e.g. models and collections) where they share the same callback
 * and context.
 *
 * @param {function} callback
 * @param {Object} context - The context to execute the callback in
 * @returns {Object}
 */
export default (callback, context) => ({
  on: (entities, events) =>
    entities.forEach(entity => entity.on(events, callback, context)),
  off: (entities, events) =>
    entities.forEach(entity => entity.off(events, callback, context)),
})
