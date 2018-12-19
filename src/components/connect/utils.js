import React from 'react'
export const BRIGADE_CONNECT_KEY = '__SECRET_BRIGADE_CONNECTED_COMPONENT__'

export const isConnectedComponent = Component => {
  if (!Component) return false

  if (React.isValidElement(Component)) {
    return Component.type && Component.type[BRIGADE_CONNECT_KEY] === true
  }

  return Component[BRIGADE_CONNECT_KEY] === true
}
