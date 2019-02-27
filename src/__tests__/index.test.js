import {
  ReactMounter,
  ReactView,
  StatefulReactView,
  combineReducers,
  createExternalReducers,
  createStore,
  createExternalReducer,
  combineAppRoutes,
} from '../index'

describe('api index exports tests', () => {
  test('createStore should be exported', () => {
    expect(createStore).toBeTruthy()
  })

  test('combineReducers should be exported', () => {
    expect(combineReducers).toBeTruthy()
  })

  test('createExternalReducers should be exported', () => {
    expect(createExternalReducers).toBeTruthy()
  })

  test('createExternalReducer should be exported', () => {
    expect(createExternalReducer).toBeTruthy()
  })

  test('ReactMounter should be exported', () => {
    expect(ReactMounter).toBeTruthy()
  })

  test('ReactView should be exported', () => {
    expect(ReactView).toBeTruthy()
  })

  test('StatefulReactView should be exported', () => {
    expect(StatefulReactView).toBeTruthy()
  })

  test('combineAppRoutes should be exported', () => {
    expect(combineAppRoutes).toBeTruthy()
  })
})
