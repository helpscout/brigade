import React, {Component} from 'react'
import {getModels, transformDataToProps} from './util'

class EnhancedComponent extends Component {
  constructor(props) {
    super(props)
    this.state = this.getPropsForState()
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
