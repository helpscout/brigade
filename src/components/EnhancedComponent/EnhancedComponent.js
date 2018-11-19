import React, {Component} from 'react'
import {getCollections, getModels, transformDataToProps} from './util'
import createStore from '../createStore'
import Provider from '../Provider'
import {isConnectedComponent} from '../connect/utils'

const COLLECTION_EVENTS = 'add change remove reset'
const MODEL_EVENTS = 'change'

class EnhancedComponent extends Component {
  constructor(props) {
    super(props)
    this.state = this.getPropsForState()
    this.collections = getCollections(props.data)
    this.models = getModels(props.data)
    this.store = createStore(props.data)
  }

  componentDidMount() {
    this.watch()
  }

  componentWillUnmount() {
    this.unwatch()
  }

  shouldUpdateState = () => {
    const {component, useStore} = this.props

    return !useStore && !isConnectedComponent(component)
  }

  renderComponent = () => {
    const {component} = this.props
    const {...props} = this.state

    if (isConnectedComponent(component)) {
      if (React.isValidElement(component)) {
        return component
      } else {
        return React.createElement(component)
      }
    }

    if (React.isValidElement(component)) {
      return React.cloneElement(component, props)
    } else {
      return React.createElement(component, props)
    }
  }

  render() {
    return <Provider store={this.store}>{this.renderComponent()}</Provider>
  }

  getPropsForState() {
    const {data, selector} = this.props
    return transformDataToProps(data, selector)
  }

  updatePropsInState() {
    if (this.shouldUpdateState()) {
      const props = this.getPropsForState()
      this.setState({
        ...props,
      })
    }
  }

  unwatch() {
    this.collections.forEach(collection => {
      collection.off(COLLECTION_EVENTS, this.updatePropsInState, this)
    })
    this.models.forEach(model => {
      model.off(MODEL_EVENTS, this.updatePropsInState, this)
    })
  }

  watch() {
    this.collections.forEach(collection => {
      collection.on(COLLECTION_EVENTS, this.updatePropsInState, this)
    })
    this.models.forEach(model => {
      model.on(MODEL_EVENTS, this.updatePropsInState, this)
    })
  }
}

export default EnhancedComponent
