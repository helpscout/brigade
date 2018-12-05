import makeWatchAll from '../makeWatchAll'

describe('makeWatchAll', () => {
  test('should return a helper with on and off methods', () => {
    const watchAll = makeWatchAll()
    expect(typeof watchAll.on).toEqual('function')
    expect(typeof watchAll.off).toEqual('function')
  })

  describe('watchAll', () => {
    let off, on, entities, events, callback, context, watchAll, expected

    beforeEach(() => {
      off = jest.fn()
      on = jest.fn()
      entities = [{off, on}, {off, on}]
      events = 'add remove'
      callback = () => {}
      context = this
      watchAll = makeWatchAll(callback, context)
      expected = [[events, callback, context], [events, callback, context]]
    })

    test('should add a listener to each entity', () => {
      watchAll.on(entities, events)
      expect(off).not.toHaveBeenCalled()
      expect(on.mock.calls).toEqual(expected)
    })

    test('should remove a listener from each entity', () => {
      watchAll.off(entities, events)
      expect(off.mock.calls).toEqual(expected)
      expect(on).not.toHaveBeenCalled()
    })
  })
})
