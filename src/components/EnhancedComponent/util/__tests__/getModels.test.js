import Backbone from 'backbone'
import {getModels} from '..'

describe('getModels', () => {
  const data = {
    number: 3,
    string: 'some string',
    array: [1, 2, 3],
    object: {some: 'Object'},
    collection: new Backbone.Collection([new Backbone.Model({id: 1})]),
  }

  test('should return an empty array by default', () => {
    expect(getModels()).toEqual([])
  })

  test('should return an empty array if there are no models', () => {
    expect(getModels(data)).toEqual([])
  })

  test('should return an array of models if there are models', () => {
    const dataWithModels = {
      ...data,
      model1: new Backbone.Model({id: 'id'}),
      model2: new Backbone.Model({some: 'value'}),
    }

    const result = getModels(dataWithModels)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual(dataWithModels.model1)
    expect(result[1]).toEqual(dataWithModels.model2)
  })
})
