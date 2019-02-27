import { createExternalReducers } from '../createExternalReducers'
import Backbone from 'backbone'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

describe('createExternalReducers tests', () => {
  let user, customers, store, getStore
  beforeEach(() => {
    user = new Backbone.Model({ name: 'Johnny Test', role: 'admin' })
    customers = new Backbone.Collection([
      { id: 1, name: 'Vladimir Lenin' },
      { id: 2, name: 'Josef Stalin' },
      { id: 3, name: 'Che Guevara' },
    ])
    store = mockStore()
    getStore = () => store
  })
  test('should return externalReducers and unbindExternals ', () => {
    const getStore = () => store
    const { externalReducers, unbindExternals } = createExternalReducers({ user, customers }, getStore)
    expect(unbindExternals).toBeInstanceOf(Function)
    expect(externalReducers.user).toBeInstanceOf(Function)
    expect(externalReducers.customers).toBeInstanceOf(Function)
  })

  describe('action dispatcher tests', () => {
    describe('Model tests', () => {
      test('should create a reducer and automatically trigger a RESET_STATE_user action when the Model changes', () => {
        createExternalReducers({ user }, getStore)
        user.set('name', 'Billy')
        expect(store.getActions()).toEqual([{ type: 'RESET_STATE_user', state: user.toJSON() }])
      })

      test('unbindExternals should unbind automatic reset actions', () => {
        const { unbindExternals } = createExternalReducers({ user }, getStore)
        user.set('name', 'Billy')
        expect(store.getActions()).toEqual([{ type: 'RESET_STATE_user', state: user.toJSON() }])
        store.clearActions()
        unbindExternals()
        user.set('name', 'Bob')
        expect(store.getActions()).toEqual([])
      })

    })

    describe('Collection tests', () => {
      test('should automatically trigger a RESET_STATE_customers action when a model is added', () => {
        createExternalReducers({ customers }, getStore)
        customers.add(new Backbone.Model({ id: 4, name: 'Billy' }))
        expect(store.getActions()).toEqual([{ type: 'RESET_STATE_customers', state: customers.toJSON() }])
      })

      test('should automatically trigger a RESET_STATE_customers action when a model is removed', () => {
        createExternalReducers({ customers }, getStore)
        customers.remove(1)
        expect(store.getActions()).toEqual([{ type: 'RESET_STATE_customers', state: customers.toJSON() }])
      })

      test('should automatically trigger a RESET_STATE_customers action when the collection is reset', () => {
        createExternalReducers({ customers }, getStore)
        customers.reset([])
        expect(store.getActions()).toEqual([{ type: 'RESET_STATE_customers', state: [] }])
      })

      test('unbindExternals should unbind automatic reset actions', () => {
        const { unbindExternals } = createExternalReducers({ customers }, getStore)
        customers.add(new Backbone.Model({ id: 4, name: 'Billy' }))
        expect(store.getActions()).toEqual([{ type: 'RESET_STATE_customers', state: customers.toJSON() }])
        store.clearActions()
        unbindExternals()
        customers.add(new Backbone.Model({ id: 5, name: 'Bob' }))
        customers.remove(1)
        customers.reset([])
        expect(store.getActions()).toEqual([])
      })
    })
  })

  describe('reducer tests', () => {
    test('should update the user slice when a RESET_STATE_user action is received', () => {
      const { externalReducers } = createExternalReducers({ user, customers }, getStore)
      const userState = { name: 'New Name', role: 'user' }
      const userAction = { type: 'RESET_STATE_user', state: userState }
      expect(externalReducers.user({}, userAction)).toEqual(userState)
    })

    test('should update the user slice when a RESET_STATE_user action is received', () => {
      const { externalReducers } = createExternalReducers({ user, customers }, getStore)
      const customersState = [
        { id: 1, name: 'Customer Foo' },
        { id: 2, name: 'Customer Bar' },
      ]
      const customersAction = { type: 'RESET_STATE_customers', state: customersState }

      expect(externalReducers.customers({}, customersAction)).toEqual(customersState)
    })
  })
})
