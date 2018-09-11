import {result} from '..'

describe('result', () => {
  test('should return a value from an object', () => {
    const props = ['number', 'string', 'object', 'array']
    const obj = {
      number: 5,
      string: 'Some string',
      object: {some: 'object'},
      array: [1, 2, 3, 4],
    }
    props.forEach(prop => {
      expect(result(obj, prop)).toEqual(obj[prop])
    })
  })

  test('should evaluate result of funciton if prop is function', () => {
    const obj = {
      func: () => 3,
    }
    const actual = result(obj, 'func')
    expect(typeof actual).not.toEqual('function')
    expect(actual).toEqual(3)
  })
})
