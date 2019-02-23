import createStore from '../createStore'
import createExternalReducer from '../createExternalReducer'

describe('createExternalStateReducer tests', () => {
  test('should create a reducer and a reset function that updates the state of the reducer', () => {
    const {reducer, reset} = createExternalReducer('todos')
    const reducers = {todos: reducer}
    const store = createStore({reducers})
    store.dispatch(reset(['Clean Room', 'Wash Dishes']))
    expect(store.getState()).toEqual({todos: ['Clean Room', 'Wash Dishes']})
  })

  test('should respect preloadedState', () => {
    const todos = ['Clean Room', 'Mow Lawn']
    const {reducer, reset} = createExternalReducer('todos')
    const reducers = {todos: reducer}
    const preloadedState = {todos}
    const store = createStore({reducers, preloadedState})
    expect(store.getState()).toEqual({todos})
    store.dispatch(reset(['Clean Room', 'Wash Dishes']))
    expect(store.getState()).toEqual({todos: ['Clean Room', 'Wash Dishes']})
  })

  test('should ignore unknown action types', () => {
    const todos = ['Clean Room', 'Mow Lawn']
    const {reducer, reset} = createExternalReducer('todos')
    const reducers = {todos: reducer}
    const preloadedState = {todos}
    const store = createStore({reducers, preloadedState})
    expect(store.getState()).toEqual({todos})
    store.dispatch({type: 'SOMETHING_UNKNOWN'})
    expect(store.getState()).toEqual({todos})
    store.dispatch(reset(['whatevs']))
    expect(store.getState()).toEqual({todos: ['whatevs']})
  })

  test('should respect initialState', () => {
    const {reducer, reset} = createExternalReducer('todos', ['Default'])
    const reducers = {todos: reducer}
    const store = createStore({reducers})
    expect(store.getState()).toEqual({todos: ['Default']})
    store.dispatch(reset([]))
    expect(store.getState()).toEqual({todos: []})
  })

  test('should be able to mix and match normal reducers with externalStateReducers', () => {
    const INCREMENT_COUNT = 'INCREMENT_COUNT'
    const count = (state = 1, action) => {
      switch (action.type) {
        case INCREMENT_COUNT:
          return state + 1
        default:
          return state
      }
    }

    const {reducer, reset} = createExternalReducer('todos', ['Default'])
    const reducers = {
      count,
      todos: reducer,
    }
    const preloadedState = {
      count: 5,
      todos: ['abc'],
    }
    const store = createStore({reducers, preloadedState})
    expect(store.getState()).toEqual(preloadedState)
    store.dispatch(reset(['xyz']))
    expect(store.getState()).toEqual({count: 5, todos: ['xyz']})
    store.dispatch({type: INCREMENT_COUNT})
    expect(store.getState()).toEqual({count: 6, todos: ['xyz']})
  })
})
