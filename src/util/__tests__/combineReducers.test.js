import * as createExternalReducersExports from '../createExternalReducers'
import Backbone from 'backbone'
import configureStore from 'redux-mock-store'
import combineReducers from '../combineReducers'
import * as reduxActions from 'redux'

const mockStore = configureStore()

describe('combineReducers tests', () => {
  let todos, user, customers, getStore, store, createExternalReducers, unbindExternals, combineReducersRedux, reducers
  beforeEach(() => {
    unbindExternals = jest.fn()
    const externalReducers = { user: jest.fn(), customers: jest.fn() }
    // Mock the createExternalReducers utility, just assert that we're calling it from combineReducers
    createExternalReducers = jest.spyOn(createExternalReducersExports, 'default')
      .mockImplementation(() => ({ externalReducers, unbindExternals }))

    reducers = () => {}
    combineReducersRedux = jest.spyOn(reduxActions, 'combineReducers')
      .mockImplementation(() => reducers)

    user = new Backbone.Model({ name: 'Johnny Test' })
    customers = new Backbone.Collection([
      { id: 1, name: 'Vladimir Lenin' },
      { id: 2, name: 'Josef Stalin' },
      { id: 3, name: 'Che Guevara' },
    ])
    // ordinary reducer
    todos = (state, action) => state
    store = mockStore()
    getStore = () => store
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
  test('should call createExternalReducers with backbone entitites', () => {
    const { reducers: reducersReturnVal, unbindExternals: unbindReturnVal } = combineReducers({ todos, user, customers }, getStore)
    expect(createExternalReducers).toHaveBeenCalledWith({ user, customers }, getStore)
    expect(createExternalReducers).toHaveBeenCalledWith({ user, customers }, getStore)
    expect(combineReducersRedux).toHaveBeenCalled()
    expect(reducersReturnVal).toBe(reducers)
    expect(unbindReturnVal).toBe(unbindExternals)
  })
})
