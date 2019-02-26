import createStore from '../createStore'
import Backbone from 'backbone'
import {combineReducers} from 'redux'

describe('createStore tests', () => {
  const INCREMENT_COUNT = 'INCREMENT_COUNT'
  const DECREMENT_COUNT = 'DECREMENT_COUNT'
  const count = (state = 1, action) => {
    switch (action.type) {
      case INCREMENT_COUNT:
        return state + 1
      case DECREMENT_COUNT:
        return state - 1
      default:
        return state
    }
  }

  const preloadedState = {count: 5}
  const reducers = {count}
  test('should combine reducers and create store capable of incrementing/decrementing count', () => {
    const store = createStore({preloadedState, reducers})
    expect(store.getState()).toEqual({count: 5})
    store.dispatch({type: INCREMENT_COUNT})
    expect(store.getState()).toEqual({count: 6})
    store.dispatch({type: DECREMENT_COUNT})
    store.dispatch({type: DECREMENT_COUNT})
    expect(store.getState()).toEqual({count: 4})
  })

  describe('External Reducers tests', () => {
    test('should add a `store.__unbindExternals` to the store', () => {
      const store = createStore({preloadedState, reducers})
      expect(store.getState()).toEqual({count: 5})
      expect(store.__unbindExternals).toBeInstanceOf(Function)
    })

    test('should update external reducers when model changes', () => {
      const user = new Backbone.Model({ name: 'Bob' })
      const reducers = {
        count,
        user,
      }
      const preloadedState = { count: 5, user: user.toJSON() }
      const store = createStore({preloadedState, reducers })
      expect(store.getState()).toEqual({count: 5, user: { name: 'Bob' }})
      user.set('name', 'Janis')
      expect(store.getState()).toEqual({count: 5, user: { name: 'Janis' }})
    })

    test('should stop updating external reducers when store.__unbindExternals() is called', () => {
      const user = new Backbone.Model({ name: 'Bob' })
      const reducers = {
        count,
        user,
      }
      const preloadedState = { count: 5, user: user.toJSON() }
      const store = createStore({preloadedState, reducers })
      expect(store.getState()).toEqual({count: 5, user: { name: 'Bob' }})
      user.set('name', 'Janis')
      expect(store.getState()).toEqual({count: 5, user: { name: 'Janis' }})
      store.__unbindExternals()
      user.set('name', 'Jenny')
      expect(store.getState()).toEqual({count: 5, user: { name: 'Janis' }})
    })
  })

  test('should be able to pass a pre-combined reducer', () => {
    const reducers = combineReducers({count})
    const store = createStore({preloadedState, reducers})
    expect(store.__unbindExternals).toBe(undefined)
    expect(store.getState()).toEqual({count: 5})
    store.dispatch({type: INCREMENT_COUNT})
    expect(store.getState()).toEqual({count: 6})
    store.dispatch({type: DECREMENT_COUNT})
    store.dispatch({type: DECREMENT_COUNT})
    expect(store.getState()).toEqual({count: 4})
  })

  describe('extraArguments tests', () => {
    let doSomething, extraArgument
    const doSomethingAction = greeting => (state, dispatch, {doSomething}) =>
      doSomething(greeting)

    beforeEach(() => {
      doSomething = jest.fn()
      extraArgument = {doSomething}
    })
    test('should have access to extraArgument', () => {
      const store = createStore({preloadedState, reducers, extraArgument})
      expect(doSomething).not.toHaveBeenCalled()
      store.dispatch(doSomethingAction('hello'))
      expect(doSomething).toHaveBeenCalledWith('hello')
      store.dispatch(doSomethingAction('goodbye'))
      expect(doSomething).toHaveBeenCalledWith('goodbye')
    })
  })

  describe('middleware tests', () => {
    test('should invoke custom middleware', () => {
      const before = jest.fn()
      const after = jest.fn()
      const middleware = store => next => action => {
        before(action)
        let result = next(action)
        after(action)
        return result
      }
      const store = createStore({
        preloadedState,
        reducers,
        middlewares: [middleware],
      })
      const action = {type: 'foo'}
      store.dispatch(action)
      expect(before).toHaveBeenCalledWith(action)
      expect(after).toHaveBeenCalledWith(action)
    })
  })
})
