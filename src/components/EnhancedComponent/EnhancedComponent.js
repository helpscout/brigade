import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {getCollections, getModels, transformDataToProps} from './util'
import createStore from '../createStore'
import Provider from '../Provider'
import {isConnectedComponent} from '../connect/utils'

const COLLECTION_EVENTS = 'add change remove reset'
const MODEL_EVENTS = 'change'

class EnhancedComponent extends Component {
  static propTypes = {
    component: PropTypes.element.isRequired,
    initialState: PropTypes.object,
  }

  static displayName = 'BrigadeEnhancedComponent'

  constructor(props) {
    super(props)

    const {
      component: {props: componentProps},
    } = props

    this.state = transformDataToProps(componentProps)
    this.stateCollections = getCollections(componentProps)
    this.stateModels = getModels(componentProps)
  }

  componentDidMount() {
    this.watchState()
  }

  componentWillUnmount() {
    this.unwatchState()
  }

  renderStateComponent = () => {
    const {component} = this.props
    const {...props} = this.state

    if (React.isValidElement(component)) {
      return React.cloneElement(component, props)
    } else {
      return React.createElement(component, props)
    }
  }

  render() {
    return this.renderStateComponent()
  }

  updateState() {
    const props = transformDataToProps(this.props.component.props)
    this.setState({
      ...props,
    })
  }

  unwatchState() {
    this.stateCollections.forEach(collection => {
      collection.off(COLLECTION_EVENTS, this.updateState, this)
    })
    this.stateModels.forEach(model => {
      model.off(MODEL_EVENTS, this.updateState, this)
    })
  }

  watchState() {
    this.stateCollections.forEach(collection => {
      collection.on(COLLECTION_EVENTS, this.updateState, this)
    })
    this.stateModels.forEach(model => {
      model.on(MODEL_EVENTS, this.updateState, this)
    })
  }
}

export default EnhancedComponent
