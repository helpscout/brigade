import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as jQueryMatchers from 'jest-jquery-matchers'
import { toBeVisible, toHaveTextContent } from 'jest-dom'

// Remove toHaveLength since it conflicts with the Enzyme matcher
const {
  toHaveLength: toHaveLengthRemoved,
  toBeVisible: toBeVisibleRemoved,
  ...restjQueryMatchers
} = jQueryMatchers

/**
 * For a given matcher, make it work whether passed the actual element, or a jQuery-wrapped element
 * i.e. expect($el).toBeVisible() OR expect($el[0]).toBeVisible()
 * @param matcher
 * @return {function(*=, ...[*]): *}
 */
function wrapWithjQuerySupport(matcher) {
  return function(element, ...rest) {
    element =
      typeof element === 'object' && element.hasOwnProperty(0)
        ? element[0]
        : element
    return matcher.apply(this, [element, ...rest])
  }
}

expect.extend({
  toBeVisible: wrapWithjQuerySupport(toBeVisible),
  toContainText: wrapWithjQuerySupport(toHaveTextContent),
  toHaveTextContent: wrapWithjQuerySupport(toHaveTextContent),
})

jest.addMatchers(restjQueryMatchers)

Enzyme.configure({adapter: new Adapter()})
