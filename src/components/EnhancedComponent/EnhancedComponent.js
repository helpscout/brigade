import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {
  getCollections,
  getModels,
  transformDataToProps
} from './util'
import createStore from '../createStore'
import Provider from '../Provider'

const COLLECTION_EVENTS = 'add change remove reset'
const MODEL_EVENTS = 'change'

class EnhancedComponent extends Component {
  static propTypes = {
    component: PropTypes.element.isRequired,
    initialState: PropTypes.object,
    externalActions: PropTypes.object,
  }

  static defaultProps = {
    initialState: {},
    externalActions: {},
  }

  static displayName = 'BrigadeEnhancedComponent'

  constructor(props) {
    super(props)

    const {
      component: {props: componentProps},
      initialState,
      externalActions,
    } = props

    this.state = transformDataToProps(componentProps)
    this.stateCollections = getCollections(componentProps)
    this.stateModels = getModels(componentProps)

    this.store = createStore(initialState, externalActions)
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
    return (
      <Provider store={this.store}>
        {this.renderStateComponent()}
      </Provider>
    )
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
