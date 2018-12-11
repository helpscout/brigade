import evaluateBuilder from '../evaluateBuilder'
import React from 'react'

const Button = ({onClick} = {}) => <button onClick={onClick}>Click me</button>

describe('evaluateBuilder', () => {
  test('returns undefined if there is no builder', () => {
    expect(evaluateBuilder()).toEqual(undefined)
  })

  test('returns an element if the builder was a component', () => {
    expect(evaluateBuilder(Button)).toEqual(
      <button onClick={undefined}>Click me</button>,
    )
  })

  test('evaluates the function in the correct context and returns result', () => {
    const view = {
      spy: jest.fn(),
    }
    const builder = function() {
      return <Button onClick={this.spy} />
    }
    const result = evaluateBuilder(builder, view)
    expect(result.props.onClick).toEqual(view.spy)
  })
})
