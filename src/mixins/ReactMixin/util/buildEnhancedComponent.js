import {EnhancedComponent} from '../../../components'
import React from 'react'

const buildEnhancedComponent = ({component, data, selector}) => {
  const props = {component, data, selector}
  return <EnhancedComponent {...props} />
}

export default buildEnhancedComponent
