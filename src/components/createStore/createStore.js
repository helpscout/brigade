import unistoreCreateStore from 'unistore'
import transformDataToProps from '../EnhancedComponent/util/transformDataToProps'
import {BRIGADE_MODEL_KEY, getModelsFromProps} from './utils'

export class BrigadeStore {
  constructor(initialState) {
    // Secret store within the store
    this.__store = unistoreCreateStore(transformDataToProps(initialState))
    this.initialState = initialState
    this.models = getModelsFromProps(initialState)

    this.watch()
  }

  destroy = () => {
    this.unwatch()
    this.unsubscribe()
  }

  updatePropsFromModelChange(nextModel) {
    const key = nextModel[BRIGADE_MODEL_KEY]
    if (!key) return

    const props = nextModel.toJSON()

    this.__store.setState({
      [key]: props,
    })
  }

  unwatch() {
    this.models.forEach(model => {
      model.off('change', this.updatePropsFromModelChange, this)
    })
  }

  watch() {
    this.models.forEach(model => {
      model.on('change', this.updatePropsFromModelChange, this)
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
