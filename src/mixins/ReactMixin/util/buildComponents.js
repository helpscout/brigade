import React from 'react'
import {render as defaultRender} from 'react-dom'
import {
  buildEnhancedComponent as defaultBuildEnhancedComponent,
  getBuilder,
  getEl,
} from '.'

/**
 * Build the React components and mount them in the view at selectors.
 *
 * @param {Object} view
 * @param {Object} components
 * @param {function} buildEnhancedComponent
 * @param {function} render
 * @returns {array}
 */
const buildComponents = (
  view,
  components,
  buildEnhancedComponent = defaultBuildEnhancedComponent,
  render = defaultRender,
) => {
  return Object.keys(components)
    .map(selector => {
      const el = getEl(view, selector)
      const builder = getBuilder(components, selector)

      if (!el || !builder) {
        return undefined
      }

      const result = typeof builder === 'function'
        ? builder.apply(view)
        : builder

      if (!result) {
        return undefined
      }

      if (result && (React.isValidElement(result) || result.component)) {
        render(buildEnhancedComponent(result), el)
      } else {
        return undefined
      }

      return el
    })
    .filter(el => !!el)
}

export default buildComponents
