import Backbone from 'backbone'
import createStore from '../createStore'
import {BRIGADE_MODEL_KEY} from '../utils'

describe('createStore', () => {
  test('should accept a Backbone model as initialState', () => {
    const store = createStore({
      member: new Backbone.Model({
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
      }),
    })

    expect(store.getState().member.firstName).toBe('Skwisgaar')
    expect(store.getState().member.lastName).toBe('Skwigelf')
  })

  test('should accept multiple Backbone models as initialState', () => {
    const store = createStore({
      member: new Backbone.Model({
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
      }),
      guitar: new Backbone.Model({
        brand: 'Gibson',
        make: 'Explorer',
        pickups: 'EMG',
      }),
    })

    expect(store.getState().member.firstName).toBe('Skwisgaar')
    expect(store.getState().member.lastName).toBe('Skwigelf')
    expect(store.getState().guitar.pickups).toBe('EMG')
  })

  test('should be able to setState on a Backbone model', () => {
    const store = createStore({
      member: new Backbone.Model({
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
      }),
    })

    store.setState({
      member: {
        ...store.getState().member,
        firstName: 'Toki',
      },
    })

    expect(store.getState().member.firstName).toBe('Toki')
    expect(store.getState().member.lastName).toBe('Skwigelf')
  })

  test('should be able to subscribe to store changes', () => {
    const spy = jest.fn()
    const store = createStore({
      member: new Backbone.Model({
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
      }),
    })

    store.subscribe(spy)

    store.setState({
      member: {
        ...store.getState().member,
        firstName: 'Toki',
      },
    })

    expect(spy).toHaveBeenCalledWith(
      {
        member: {
          firstName: 'Toki',
          lastName: 'Skwigelf',
        },
      },
      undefined,
    )
  })

  test('should update store on Backbone model changes', () => {
    const spy = jest.fn()
    const member = new Backbone.Model({
      firstName: 'Skwisgaar',
      lastName: 'Skwigelf',
    })

    const store = createStore({
      member,
      bandName: 'Dethklok',
    })

    store.subscribe(spy)

    expect(spy).not.toHaveBeenCalled()

    member.set('firstName', 'Toki')

    expect(store.getState().member.firstName).toBe('Toki')
    expect(store.getState().member.lastName).toBe('Skwigelf')
    expect(store.getState().bandName).toBe('Dethklok')

    expect(spy).toHaveBeenCalledWith(
      {
        member: {
          firstName: 'Toki',
          lastName: 'Skwigelf',
        },
        bandName: 'Dethklok',
      },
      undefined,
    )
  })

  test('should unsubscribe on destroy', () => {
    const spy = jest.fn()
    const member = new Backbone.Model({
      firstName: 'Skwisgaar',
      lastName: 'Skwigelf',
    })

    const store = createStore({
      member,
    })

    store.subscribe(spy)

    store.destroy()

    member.set('firstName', 'Toki')

    expect(store.getState().member.firstName).toBe('Skwisgaar')
    expect(spy).not.toHaveBeenCalled()
  })

  test('should not update store if, some how, the Brigade secret key is removed', () => {
    const spy = jest.fn()
    const member = new Backbone.Model({
      firstName: 'Skwisgaar',
      lastName: 'Skwigelf',
    })

    const store = createStore({
      member,
    })

    store.subscribe(spy)

    member[BRIGADE_MODEL_KEY] = undefined

    member.set('firstName', 'Toki')

    expect(store.getState().member.firstName).toBe('Skwisgaar')
    expect(spy).not.toHaveBeenCalled()
  })
})
