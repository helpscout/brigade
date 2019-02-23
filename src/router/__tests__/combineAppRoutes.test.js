import {combineAppRoutes} from '../combineAppRoutes'

describe('combineAppRoutes', () => {
  test('Returns an empty object by defaul;t', () => {
    expect(combineAppRoutes()).toEqual({})
  })

  test('Returns marionetteRoutes unmodified', () => {
    const marionetteRoutes = {
      'app(/)': 'app',
      'settings(/)': 'settingsApp',
    }

    const combinedRoutes = combineAppRoutes({marionetteRoutes})

    expect(combinedRoutes).toEqual(marionetteRoutes)
  })

  test('Can modify single reactRoutes', () => {
    const reactRoutes = {
      reactApp: 'someReactApp',
    }

    const combinedRoutes = combineAppRoutes({reactRoutes})

    expect(combinedRoutes).toEqual({
      'reactApp(/)(*notFound)': 'someReactApp',
    })
  })

  test('Can modify multiple reactRoutes', () => {
    const reactRoutes = {
      reactApp: 'someReactApp',
      anotherReactApp: 'yetAnotherReactApp',
      thirdOne: 'whyNot',
    }

    const combinedRoutes = combineAppRoutes({reactRoutes})

    expect(combinedRoutes).toEqual({
      'reactApp(/)(*notFound)': 'someReactApp',
      'anotherReactApp(/)(*notFound)': 'yetAnotherReactApp',
      'thirdOne(/)(*notFound)': 'whyNot',
    })
  })

  test('Can handle nested React routes', () => {
    const reactRoutes = {
      'one/two/three': 'someReactApp',
    }

    const combinedRoutes = combineAppRoutes({reactRoutes})

    expect(combinedRoutes).toEqual({
      'one/two/three(/)(*notFound)': 'someReactApp',
    })
  })

  test('Can handle React routes ending with (/)', () => {
    const reactRoutes = {
      'reactApp(/)': 'someReactApp',
    }

    const combinedRoutes = combineAppRoutes({reactRoutes})

    expect(combinedRoutes).toEqual({
      'reactApp(/)(*notFound)': 'someReactApp',
    })
  })

  test('Can handle nested React routes ending with (/)', () => {
    const reactRoutes = {
      'one/two/three(/)': 'someReactApp',
    }

    const combinedRoutes = combineAppRoutes({reactRoutes})

    expect(combinedRoutes).toEqual({
      'one/two/three(/)(*notFound)': 'someReactApp',
    })
  })

  test('Can combine reactRoutes and marionetteRoutes', () => {
    const reactRoutes = {
      reactApp: 'someReactApp',
      anotherReactApp: 'yetAnotherReactApp',
      'thirdOne(/)': 'whyNot',
    }

    const marionetteRoutes = {
      'app/sub(/)': 'app',
      'settings(/)': 'settingsApp',
    }

    const combinedRoutes = combineAppRoutes({reactRoutes, marionetteRoutes})

    expect(combinedRoutes).toEqual({
      'reactApp(/)(*notFound)': 'someReactApp',
      'anotherReactApp(/)(*notFound)': 'yetAnotherReactApp',
      'thirdOne(/)(*notFound)': 'whyNot',
      'app/sub(/)': 'app',
      'settings(/)': 'settingsApp',
    })
  })
})
