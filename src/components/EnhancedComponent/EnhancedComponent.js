import React, {Component} from 'react'
import {getCollections, getModels, transformDataToProps} from './util'

const COLLECTION_EVENTS = 'add change remove reset'
const MODEL_EVENTS = 'change'

class EnhancedComponent extends Component {
  constructor(props) {
    super(props)
    this.state = this.getPropsForState()
    this.collections = getCollections(props.data)
    this.models = getModels(props.data)
  }

  componentDidMount() {
    this.watch()
  }

  componentWillUnmount() {
    this.unwatch()
  }

  render() {
    const {component} = this.props
    const {...props} = this.state
    return React.cloneElement(component, props)
  }

  getPropsForState() {
    const {data, selector} = this.props
    return transformDataToProps(data, selector)
  }

  updatePropsInState() {
    const props = this.getPropsForState()
    this.setState({
      ...props,
    })
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
