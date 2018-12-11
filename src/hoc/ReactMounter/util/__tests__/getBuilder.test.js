import {getBuilder} from '..'

describe('getBuilder', () => {
  const builder = jest.fn()
  const components = {
    '#form': builder,
  }

  test('should return undefined if there is no builder for the selector', () => {
    expect(getBuilder(components, '#title')).toBeUndefined()
  })

  test('should return the builder if there is a match for the selector', () => {
    expect(getBuilder(components, '#form')).toEqual(builder)
  })
})
