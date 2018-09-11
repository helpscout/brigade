import Backbone from 'backbone'
import {transformValueToProp} from '..'

describe('transformValueToProps', () => {
  test('should return the value unaltered by default', () => {
    const values = [1, 'a', [1, 2, 3], {some: Object}]
    values.forEach((value, index) => {
      const result = transformValueToProp(value)
      expect(result).toEqual(values[index])
    })
  })

  test('should convert a model to JSON', () => {
    const value = new Backbone.Model({id: '123'})
    const result = transformValueToProp(value)
    expect(result).not.toEqual(value)
    expect(result).toEqual(value.toJSON())
  })
})
