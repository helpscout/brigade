import Backbone from 'backbone'
import { COLLECTION_EVENTS, MODEL_EVENTS } from '../components/createStore/utils'

/**
 * Create a reducer capable of being reset externally by dispatching the `reset` action
 * @param name
 * @param initialState
 * @return {{reducer: reducer, reset: (function(*): {type: string, state: *})}}
 */
export const createExternalReducer = (name, initialState = '') => {
  const actionType = `RESET_STATE_${name}`
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType:
        return action.state
      default:
        return state
    }
  }
  const reset = state => ({type: actionType, state})
  return {reducer, reset}
}

/**
 * Create a number of external state reducers, automatically binding to collection or model events and dispatching
 * STATE_RESET_XXX actions to keep them up to date, allowing external control of a portion of Redux state
 *
 * @param modelCollectionMap
 * @param getStore
 * @return {{externalReducers, externalState, unbindAll: (function(): void)}}
 */
export const createExternalReducers = (modelCollectionMap, getStore) => {
  const externalReducers = {}
  const externalState = {}
  const eventBindings = []
  Object.entries(modelCollectionMap).forEach(([name, entity]) => {
    const { reducer, reset } = createExternalReducer(name)
    externalReducers[name] = reducer
    externalState[name] = entity.toJSON()
    const events =  entity instanceof Backbone.Collection
      ? COLLECTION_EVENTS
      : MODEL_EVENTS
    const callback = () => {
      const store = getStore()
      store.dispatch(reset(entity.toJSON()))
    }
    entity.on(events, callback)
    eventBindings.push({entity, events, callback})
  })
  const unbindAll = () => eventBindings.forEach(({ entity, events, callback }) => entity.off(events, callback))
  return {
    externalReducers,
    externalState,
    unbindAll
  }
}


export default createExternalReducer
