import React, {Component} from 'react'
import {getModels, transformDataToProps} from './util'
import createStore from '../createStore'
import Provider from '../Provider'
import {isConnectedComponent} from '../connect/utils'

class EnhancedComponent extends Component {
  constructor(props) {
    super(props)
    this.state = this.getPropsForState()
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
    this.models.forEach(model => {
      model.off('change', this.updatePropsInState, this)
    })
  }

  watch() {
    this.models.forEach(model => {
      model.on('change', this.updatePropsInState, this)
    })
  }
}

export default EnhancedComponent
