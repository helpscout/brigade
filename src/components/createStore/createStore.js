import unistoreCreateStore from 'unistore'
import transformDataToProps from '../EnhancedComponent/util/transformDataToProps'
import {
  BRIGADE_MODEL_KEY,
  COLLECTION_EVENTS,
  MODEL_EVENTS,
  getModelsFromProps,
  getCollectionsFromProps,
} from './utils'

export class BrigadeStore {
  constructor(initialState) {
    // Secret store within the store
    this.__store = unistoreCreateStore(transformDataToProps(initialState))
    this.initialState = initialState
    this.models = getModelsFromProps(initialState)
    this.collections = getCollectionsFromProps(initialState)

    this.watch()
  }

  destroy = () => {
    this.unwatch()
    this.unsubscribe()
  }

  updatePropsFromBackboneChange(nextInstance) {
    // Collection vs. Model check
    const backboneInstance = nextInstance.collection
      ? nextInstance.collection
      : nextInstance

    const key = backboneInstance[BRIGADE_MODEL_KEY]
    if (!key) return

    const props = backboneInstance.toJSON()

    this.__store.setState({
      [key]: props,
    })
  }

  unwatch() {
    this.collections.forEach(collection => {
      collection.off(
        COLLECTION_EVENTS,
        this.updatePropsFromBackboneChange,
        this,
      )
    })
    this.models.forEach(model => {
      model.off(MODEL_EVENTS, this.updatePropsFromBackboneChange, this)
    })
  }

  watch() {
    this.collections.forEach(collection => {
      collection.on(COLLECTION_EVENTS, this.updatePropsFromBackboneChange, this)
    })
    this.models.forEach(model => {
      model.on(MODEL_EVENTS, this.updatePropsFromBackboneChange, this)
    })
  }

  getState = () => this.__store.getState()
  setState = newState => this.__store.setState(newState)
  action = action => this.__store.action(action)
  subscribe = callback => this.__store.subscribe(callback)
  unsubscribe = listener => this.__store.unsubscribe(listener)
}

const createStore = state => {
  return new BrigadeStore(state)
}

export default createStore
