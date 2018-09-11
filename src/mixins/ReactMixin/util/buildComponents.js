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

      if (result.constructor === Array) {
        render(buildEnhancedComponent(...result), el)
      } else {
        render(result, el)
      }

      return el
    })
    .filter(el => !!el)
}

export default buildComponents
