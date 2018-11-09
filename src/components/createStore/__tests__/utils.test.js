import Backbone from 'backbone'
import {
  BRIGADE_MODEL_KEY,
  enhanceBackboneClassWithBrigade,
  getModelsFromProps,
  getCollectionsFromProps,
} from '../utils'

describe('getModelsFromProps', () => {
  test('should return empty array by default', () => {
    expect(getModelsFromProps()).toEqual([])
  })

  test('should retrieve Backbone models', () => {
    const props = {
      vocalist: new Backbone.Model({name: 'Nathan Explosion'}),
    }
    const models = getModelsFromProps(props)

    expect(models).not.toEqual([])
    expect(models[0][BRIGADE_MODEL_KEY]).toBe('vocalist')
  })
})

describe('getCollectionsFromProps', () => {
  test('should return empty array by default', () => {
    expect(getCollectionsFromProps()).toEqual([])
  })

  test('should retrieve Backbone collections', () => {
    const props = {
      members: new Backbone.Collection({name: 'Nathan Explosion'}),
    }
    const collections = getCollectionsFromProps(props)

    expect(collections).not.toEqual([])
    expect(collections[0][BRIGADE_MODEL_KEY]).toBe('members')
  })
})

describe('enhanceBackboneClassWithBrigade', () => {
  test('should enhance object, if a Backbone model', () => {
    const obj = new Backbone.Model({name: 'Nathan Explosion'})

    enhanceBackboneClassWithBrigade(obj, 'brutal')

    expect(obj[BRIGADE_MODEL_KEY]).toBe('brutal')
  })

  test('should enhance object, if a Backbone collection', () => {
    const obj = new Backbone.Collection()

    enhanceBackboneClassWithBrigade(obj, 'brutal')

    expect(obj[BRIGADE_MODEL_KEY]).toBe('brutal')
  })

  test('should not enhance object, if not a Backbone model/collection', () => {
    const obj = {name: 'Nathan Explosion'}

    enhanceBackboneClassWithBrigade(obj, 'brutal')

    expect(obj[BRIGADE_MODEL_KEY]).toBeUndefined()
  })
})
