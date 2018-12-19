import {getEl} from '..'

describe('getEl', () => {
  let view = {}

  beforeEach(() => {
    view.$ = jest.fn()
  })

  test('returns undefined if no nodes match the selector', () => {
    view.$.mockReturnValueOnce([])
    expect(getEl(view, '.some-class')).toBeUndefined()
  })

  test('returns the first match', () => {
    const elements = [
      "<p class='some-value'></p>",
      "<div class='some-value'></div>",
    ]
    view.$.mockReturnValueOnce(elements)
    view.$.mockReturnValueOnce([])
    expect(getEl(view, '.some-class')).toEqual(elements[0])
  })
})
