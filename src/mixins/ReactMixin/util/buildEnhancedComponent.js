import {EnhancedComponent} from '../../../components'
import React from 'react'

const buildEnhancedComponent = componentOrProps => {
  if (React.isValidElement(componentOrProps)) {
    return <EnhancedComponent component={componentOrProps} />
  }
  return <EnhancedComponent {...componentOrProps} />
}

export default buildEnhancedComponent
