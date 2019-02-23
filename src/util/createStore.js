import {
  applyMiddleware,
  combineReducers,
  createStore as createStoreRedux,
} from 'redux'
import thunk from 'redux-thunk'

/**
 * Create a ReduxStore with a given preloadedState, reducers, middlewares, or thunk extraArgument`
 * @param preloadedState
 * @param reducers
 * @param middlewares
 * @param extraArgument
 * @return {Store<any, Action> & {dispatch: any}}
 */
const createStore = ({
  preloadedState,
  reducers,
  middlewares,
  extraArgument,
}) => {
  if (!middlewares) {
    middlewares = extraArgument
      ? [thunk.withExtraArgument(extraArgument)]
      : [thunk]
  }
  if (typeof reducers === 'object') {
    reducers = combineReducers(reducers)
  }
  return createStoreRedux(
    reducers,
    preloadedState,
    applyMiddleware(...middlewares),
  )
}

export default createStore
