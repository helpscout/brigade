import {buildEnhancedComponent} from '..'
import {EnhancedComponent} from '../../../../components'
import React from 'react'

describe('buildEnhancedComponent', () => {
  test('should return an enhanced component', () => {
    const Button = () => <button>Click Me</button>
    const data = {type: 'submit'}
    const selector = ({type}) => type
    const component = buildEnhancedComponent(<Button />, data, selector)
    expect(component).toEqual(
      <EnhancedComponent
        component={<Button />}
        data={data}
        selector={selector}
      />,
    )
  })
})
