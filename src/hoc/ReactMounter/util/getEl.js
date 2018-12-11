/**
 * Returns a DOM node from the view.
 *
 * @param {Object} view
 * @param {string} selector
 * @returns {Object}
 */
const getEl = (view, selector) => {
  const matches = view.$(selector)
  if (matches && matches.length > 0) {
    return matches[0]
  }
  return undefined
}

export default getEl
