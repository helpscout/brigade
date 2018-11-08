import {BRIGADE_CONNECT_KEY} from './utils'
import {connect as unistoreConnect} from 'unistore/react'

const connect = (mapStateToProps, actions) => Child => {
  const connectedComponent = unistoreConnect(mapStateToProps, actions)(Child)
  connectedComponent[BRIGADE_CONNECT_KEY] = true

  return connectedComponent
}

export default connect
