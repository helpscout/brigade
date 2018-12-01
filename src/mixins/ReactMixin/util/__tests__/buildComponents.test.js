import {
  buildComponents,
  buildEnhancedComponent as defaultBuildEnhancedComponent,
} from '..'
import {EnhancedComponent} from '../../../../components'
import React from 'react'

describe('buildComponents', () => {
  let buildEnhancedComponent
  let render

  const Button = () => <button>Click Me</button>

  beforeEach(() => {
    buildEnhancedComponent = jest.fn()
    render = jest.fn()
  })

  test('should return an empty list if none of the selectors match', () => {
    const view = {
      $: () => undefined,
    }
    const components = {
      '.some-class': () => ({}),
    }
    const builtComponents = buildComponents(
      view,
      components,
      buildEnhancedComponent,
      render,
    )
    expect(builtComponents).toBeDefined()
    expect(builtComponents).toHaveLength(0)
  })

  test('should return an empty list if there are no builders', () => {
    const view = {
      $: () => ["<p class='some-class'></p>"],
    }
    const components = {
      '.some-class': false,
    }
    const builtComponents = buildComponents(
      view,
      components,
      buildEnhancedComponent,
      render,
    )
    expect(builtComponents).toBeDefined()
    expect(builtComponents).toHaveLength(0)
  })

  test('should filter out items with unexpected builder results', () => {
    const view = {
      $: () => ["<p class='some-class'></p>"],
    }
    const components = {
      '.some-class': () => ({}),
    }
    const builtComponents = buildComponents(
      view,
      components,
      buildEnhancedComponent,
      render,
    )
    expect(builtComponents).toBeDefined()
    expect(builtComponents).toHaveLength(0)
  })

  test('should filter out items with missing elements or builders', () => {
    const view = {
      $: selector => {
        switch (selector) {
          case '.some-class':
            return ["<p class='some-class'></p>"]
          case '.other-class':
            return ["<div class='other-class'></div>"]
          case '.no-builder-class':
            return ["<div class='no-builder-class'></div>"]
          default:
            return undefined
        }
      },
    }
    const components = {
      '.some-class': () => ({component: <div />}),
      '.other-class': false,
      '.no-match-class': () => ({}),
      '.no-builder-class': () => false,
    }
    const builtComponents = buildComponents(
      view,
      components,
      buildEnhancedComponent,
      render,
    )
    expect(builtComponents).toBeDefined()
    expect(builtComponents).toHaveLength(1)
  })

  test('should render an enhanced react component', () => {
    const element = "<p class='some-class'></p>"
    const view = {
      $: () => [element],
    }
    const components = {
      '.some-class': () => ({
        component: <Button />,
        data: {type: 'submit'},
      }),
    }
    const builtComponents = buildComponents(
      view,
      components,
      defaultBuildEnhancedComponent,
      render,
    )
    expect(builtComponents).toBeDefined()
    expect(builtComponents).toHaveLength(1)
    expect(render).toHaveBeenCalled()
    expect(render.mock.calls[0][0]).toEqual(
      <EnhancedComponent
        component={<Button />}
        data={{type: 'submit'}}
        selector={undefined}
      />,
    )
    expect(render.mock.calls[0][1]).toEqual(element)
  })
})
