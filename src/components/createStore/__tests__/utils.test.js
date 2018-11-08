import Backbone from 'backbone'
import {
  BRIGADE_MODEL_KEY,
  enhanceBackboneModelWithBrigade,
  getModelsFromProps,
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

describe('enhanceBackboneModelWithBrigade', () => {
  test('should enhance object, if a Backbone model', () => {
    const obj = new Backbone.Model({name: 'Nathan Explosion'})

    enhanceBackboneModelWithBrigade(obj, 'brutal')

    expect(obj[BRIGADE_MODEL_KEY]).toBe('brutal')
  })

  test('should not enhance object, if not a Backbone model', () => {
    const obj = {name: 'Nathan Explosion'}

    enhanceBackboneModelWithBrigade(obj, 'brutal')

    expect(obj[BRIGADE_MODEL_KEY]).toBeUndefined()
  })
})
