import Backbone from 'backbone'
import {getCollections} from '..'

describe('getCollections', () => {
  const data = {
    number: 3,
    string: 'some string',
    array: [1, 2, 3],
    object: {some: 'Object'},
    model: new Backbone.Model({id: '1'}),
  }

  test('should return an empty array by default', () => {
    expect(getCollections()).toEqual([])
  })

  test('should return an empty array if there are no collections', () => {
    expect(getCollections(data)).toEqual([])
  })

  test('should return an array of collections if there are collections', () => {
    const dataWithCollections = {
      ...data,
      collection1: new Backbone.Collection([]),
      collection2: new Backbone.Collection([
        new Backbone.Model({id: '2'}),
        new Backbone.Model({id: '3'}),
      ]),
    }
    const result = getCollections(dataWithCollections)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual(dataWithCollections.collection1)
    expect(result[1]).toEqual(dataWithCollections.collection2)
    expect(result[1]).toHaveLength(2)
  })
})
