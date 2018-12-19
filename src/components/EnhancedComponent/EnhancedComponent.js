import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {
  getCollections,
  getModels,
  transformDataToProps,
  makeWatchAll,
} from './util'
import createStore from '../createStore'
import Provider from '../Provider'

const COLLECTION_EVENTS = 'add change remove reset'
const MODEL_EVENTS = 'change'

class EnhancedComponent extends Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.element.isRequired,
      PropTypes.func,
    ]),
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

    this.watchAll = makeWatchAll(this.updateState, this)
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
    return <Provider store={this.store}>{this.renderStateComponent()}</Provider>
  }

  updateState() {
    const props = transformDataToProps(this.props.component.props)
    this.setState({
      ...props,
    })
  }

  unwatchState() {
    this.watchAll.off(this.stateCollections, COLLECTION_EVENTS)
    this.watchAll.off(this.stateModels, MODEL_EVENTS)
  }

  watchState() {
    this.watchAll.on(this.stateCollections, COLLECTION_EVENTS)
    this.watchAll.on(this.stateModels, MODEL_EVENTS)
  }
}

export default EnhancedComponent
