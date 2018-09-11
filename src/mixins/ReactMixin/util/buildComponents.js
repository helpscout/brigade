import React from 'react'
import {render as defaultRender} from 'react-dom'
import {
  buildEnhancedComponent as defaultBuildEnhancedComponent,
  getBuilder,
  getEl,
} from '.'

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

      const result = builder.apply(view)
      if (!result) {
        return undefined
      }

      if (React.isValidElement(result)) {
        render(result, el)
      } else if (result && result.component) {
        render(buildEnhancedComponent(result), el)
      } else {
        return undefined
      }

      return el
    })
    .filter(el => !!el)
}

export default buildComponents
