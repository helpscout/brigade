import Backbone from 'backbone'
import {transformDataToProps} from '..'

describe('transformDataToProps', () => {
  const data = {
    number: 5,
    string: 'Some string',
    object: {some: 'object'},
    array: [1, 2, 3, 4],
  }

  const dataWithModels = {
    ...data,
    model1: new Backbone.Model({id: 'id'}),
    model2: new Backbone.Model({some: 'value'}),
  }

  const dataWithJSON = {
    ...data,
    model1: dataWithModels.model1.toJSON(),
    model2: dataWithModels.model2.toJSON(),
  }

  test('should return an empty object by default', () => {
    const props = transformDataToProps()
    expect(props).toEqual({})
    expect(Object.keys(props)).toHaveLength(0)
  })

  test('should return the given data unaltered by default', () => {
    expect(transformDataToProps(data)).toEqual(data)
  })

  test('should return the given data with models cast to JSON', () => {
    expect(transformDataToProps(dataWithModels)).toEqual(dataWithJSON)
  })

  test('should return a slice of the data when given a selector', () => {
    const selector = ({number, string}) => ({number: number * 2, string})
    const result = transformDataToProps(data, selector)
    expect(result.number).toEqual(data.number * 2)
    expect(result.string).toEqual(data.string)
    expect(result.object).toBeUndefined()
    expect(result.array).toBeUndefined()
    expect(Object.keys(result)).toHaveLength(2)
  })
})
