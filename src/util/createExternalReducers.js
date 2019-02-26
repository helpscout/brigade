import Backbone from 'backbone'
import { COLLECTION_EVENTS, MODEL_EVENTS } from '../components/createStore/utils'
import createExternalReducer from './createExternalReducer'

/**
 * Create a number of external state reducers, automatically binding to collection or model events and dispatching
 * RESET_STATE_XXX actions to keep them up to date, allowing external control of a portion of Redux state
 *
 * @param modelCollectionMap
 * @param getStore
 * @return {{externalReducers, unbindExternals: (function(): void)}}
 */
export const createExternalReducers = (modelCollectionMap, getStore) => {
  const externalReducers = {}
  const eventBindings = []
  Object.entries(modelCollectionMap).forEach(([name, entity]) => {
    const { reducer, reset } = createExternalReducer(name)
    externalReducers[name] = reducer
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
  const unbindExternals = () => eventBindings.forEach(({ entity, events, callback }) => entity.off(events, callback))
  return {
    externalReducers,
    unbindExternals
  }
}


export default createExternalReducers
