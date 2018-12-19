import {EnhancedComponent} from '../../../components'
import React from 'react'

/**
 * Build an EnhancedComponent using a React component like `<List />` or
 * props like `{component: <List />}` as the basis.
 *
 * @param {ReactNode|Object} componentOrProps
 * @param {ReactNode} componentOrProps.component
 * @param {Object} componentOrProps.initialState
 * @param {Object} componentOrProps.extraActions
 * @returns {ReactNode}
 */
const buildEnhancedComponent = componentOrProps => {
  if (React.isValidElement(componentOrProps)) {
    return <EnhancedComponent component={componentOrProps} />
  }
  return <EnhancedComponent {...componentOrProps} />
}

export default buildEnhancedComponent
