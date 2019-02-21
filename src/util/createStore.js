import {
  applyMiddleware,
  combineReducers,
  createStore as createStoreRedux,
} from 'redux'
import thunk from 'redux-thunk'

const createStore = ({
  preloadedState,
  reducers,
  middlewares,
  extraArgument,
  createStore,
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
