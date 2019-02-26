import Backbone from 'backbone'
import { combineReducers as combineReducersRedux } from 'redux'
import createExternalReducers from './createExternalReducers'

/**
 * Combine a set of regular Redux reducers, alongside models and collections, which will be automatically synced with
 * the store
 *
 * @param map
 * @param getStore
 * @return {{reducers: ((state: (any), action: AnyAction) => any), unbindExternals: *}}
 */
export const combineReducers = (map, getStore) => {
  let reducers = {}
  const backboneEntities = {}
  Object.entries(map).forEach(([name, entity]) => {
    if (entity instanceof Backbone.Collection || entity instanceof Backbone.Model) {
      backboneEntities[name] = entity
    } else {
      reducers[name] = entity
    }
  })
  const { externalReducers, unbindExternals } = createExternalReducers(backboneEntities, getStore)
  reducers = combineReducersRedux({
    ...reducers,
    ...externalReducers,
  })
  return {
    reducers,
    unbindExternals,
  }
}

export default combineReducers
