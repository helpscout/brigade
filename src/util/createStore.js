import {
  applyMiddleware,
  createStore as createStoreRedux,
} from 'redux'
import { combineReducers } from './combineReducers'
import thunk from 'redux-thunk'

/**
 * Create a ReduxStore with a given preloadedState, reducers, middlewares, or thunk extraArgument`
 *
 * Also adds a `__unbindExternals` method to the store to allow unbinding of external reducer events
 * @param preloadedState
 * @param reducerMap
 * @param middlewares
 * @param extraArgument
 * @return {(Store<any, Action> & {dispatch: any}) | *}
 */
const createStore = ({
  preloadedState,
  reducers : reducerMap,
  middlewares,
  extraArgument,
}) => {
  if (!middlewares) {
    middlewares = extraArgument
      ? [thunk.withExtraArgument(extraArgument)]
      : [thunk]
  }

  if (typeof reducerMap !== 'object') {
    // if reducers is passed in already-combined, just use it
    return createStoreRedux(reducerMap, preloadedState, applyMiddleware(...middlewares))
  }
  const { reducers, unbindExternals } = combineReducers(reducerMap, () => store)
  const store = createStoreRedux(
    reducers,
    preloadedState,
    applyMiddleware(...middlewares),
  )
  store.__unbindExternals = unbindExternals
  return store
}

export default createStore
