import Backbone from 'backbone'
import createStore from '../createStore'
import {BRIGADE_MODEL_KEY} from '../utils'

describe('createStore', () => {
  describe('Backbone.Model', () => {
    test('should accept a Backbone model in initialState', () => {
      const store = createStore({
        member: new Backbone.Model({
          firstName: 'Skwisgaar',
          lastName: 'Skwigelf',
        }),
      })

      expect(store.getState().member.firstName).toBe('Skwisgaar')
      expect(store.getState().member.lastName).toBe('Skwigelf')
    })

    test('should accept multiple Backbone models in initialState', () => {
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

  describe('Backbone.Collection', () => {
    const initialMembers = [
      {
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
        id: 'skwisgaar',
      },
      {
        firstName: 'Toki',
        lastName: 'Wartooth',
        id: 'toki',
      },
    ]

    test('should accept a Backbone collection in initialState', () => {
      const Members = Backbone.Collection.extend({
        model: Backbone.Model,
      })

      const members = new Members(initialMembers)

      const store = createStore({
        members,
      })

      expect(Array.isArray(store.getState().members)).toBe(true)
      expect(store.getState().members.length).toBe(2)
      expect(store.getState().members[0]).toEqual({
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
        id: 'skwisgaar',
      })
      expect(store.getState().members[1]).toEqual({
        firstName: 'Toki',
        lastName: 'Wartooth',
        id: 'toki',
      })
    })

    test('should be able to add to collection', () => {
      const Members = Backbone.Collection.extend({
        model: Backbone.Model,
      })
      const members = new Members(initialMembers)

      const store = createStore({
        members,
      })

      members.add({
        firstName: 'William',
        lastName: 'Murderface',
        id: 'murderface',
      })

      expect(store.getState().members.length).toBe(3)
      expect(store.getState().members[2].lastName).toBe('Murderface')
    })

    test('should be able to add/remove from to collection', () => {
      const Members = Backbone.Collection.extend({
        model: Backbone.Model,
      })
      const members = new Members(initialMembers)

      const store = createStore({
        members,
      })

      members.add({
        firstName: 'William',
        lastName: 'Murderface',
        id: 'murderface',
      })

      members.remove('skwisgaar')

      expect(store.getState().members[0].lastName).toBe('Wartooth')
      expect(store.getState().members[1].lastName).toBe('Murderface')

      members.add({
        firstName: 'Nathan',
        lastName: 'Explosion',
        id: 'nathan',
      })

      expect(store.getState().members.length).toBe(3)
    })

    test('should be able to change within to collection', () => {
      const Members = Backbone.Collection.extend({
        model: Backbone.Model,
      })
      const members = new Members(initialMembers)

      const store = createStore({
        members,
      })

      members.add({
        firstName: 'William',
        lastName: 'Murderface',
        id: 'murderface',
      })

      members.findWhere({id: 'murderface'}).set({
        lastName: 'MurderfaceMurderfaceMurderface',
      })

      expect(store.getState().members.length).toBe(3)
      expect(store.getState().members[2].lastName).toBe(
        'MurderfaceMurderfaceMurderface',
      )
    })

    test('should be able to reset to collection', () => {
      const Members = Backbone.Collection.extend({
        model: Backbone.Model,
      })
      const members = new Members(initialMembers)

      const store = createStore({
        members,
      })

      expect(store.getState().members.length).toBe(2)

      members.reset()

      expect(store.getState().members.length).toBe(0)
    })

    test('should be able to subscribe to store changes', () => {
      const spy = jest.fn()
      const Members = Backbone.Collection.extend({
        model: Backbone.Model,
      })
      const members = new Members(initialMembers)

      const store = createStore({
        members,
      })

      store.subscribe(spy)

      expect(spy).not.toHaveBeenCalled()

      members.add({
        firstName: 'William',
        lastName: 'Murderface',
        id: 'murderface',
      })

      expect(spy).toHaveBeenCalled()
    })

    test('should be able to unsubscribe to store changes', () => {
      const spy = jest.fn()
      const Members = Backbone.Collection.extend({
        model: Backbone.Model,
      })
      const members = new Members(initialMembers)

      const store = createStore({
        members,
      })

      store.subscribe(spy)

      expect(spy).not.toHaveBeenCalled()

      store.unsubscribe(spy)

      members.add({
        firstName: 'William',
        lastName: 'Murderface',
        id: 'murderface',
      })

      expect(spy).not.toHaveBeenCalled()
    })

    test('should unsubscribe on destroy', () => {
      const spy = jest.fn()
      const Members = Backbone.Collection.extend({
        model: Backbone.Model,
      })
      const members = new Members(initialMembers)

      const store = createStore({
        members,
      })

      store.subscribe(spy)

      expect(spy).not.toHaveBeenCalled()

      store.destroy()

      members.add({
        firstName: 'William',
        lastName: 'Murderface',
        id: 'murderface',
      })

      expect(spy).not.toHaveBeenCalled()
    })
  })
})
