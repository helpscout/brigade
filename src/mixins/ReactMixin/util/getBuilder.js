/**
 * Get the builder. This may be a React component that can be used as is or it
 * may be props used as instructions to create a React component. It could even
 * be a function which can be invoked to return a React component or props.
 *
 * @param {Object} components
 * @param {string} selector
 * @returns {ReactNode|Object|function|undefined}
 */
const getBuilder = (components, selector) => {
  return components[selector]
}

export default getBuilder
