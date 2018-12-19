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
  constructor(initialState = {}, externalActions = {}) {
    // Secret store within the store
    this.__store = unistoreCreateStore(transformDataToProps(initialState))
    this.initialState = initialState
    this.externalActions = externalActions
    this.models = getModelsFromProps(initialState)
    this.collections = getCollectionsFromProps(initialState)

    this.watch()
  }

  destroy = () => {
    this.unwatch()
    this.unsubscribe()
  }

  updatePropsFromBackboneChange(nextInstance) {
    // Collection vs. Model check. If nextInstance is a model from a collection,
    // we want a reference to the collection.
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

  /**
   * The first argument of an action is `state`. This method returns the
   * externalActions re-mapped such that the first argument is dropped.
   * This is useful if the code you are connecting via externalActions has no
   * concept of state or the store.
   * @return Object
   */
  getStatelessExternalActions() {
    const actions = this.getExternalActions()
    return Object.keys(actions).reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: (state, ...rest) => actions[key](...rest),
      }),
      {},
    )
  }

  getExternalActions = () => this.externalActions
  getState = () => this.__store.getState()
  setState = newState => this.__store.setState(newState)
  action = action => this.__store.action(action)
  subscribe = callback => this.__store.subscribe(callback)
  unsubscribe = listener => this.__store.unsubscribe(listener)
}

const createStore = (initialState, externalActions) => {
  return new BrigadeStore(initialState, externalActions)
}

export default createStore
