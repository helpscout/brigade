import Backbone from 'backbone'
import {EnhancedComponent} from '..'
import React from 'react'
import {mount} from 'enzyme'

describe('EnhancedComponent', () => {
  const Button = ({label}) => <button>{label}</button>

  test('should listen for changes on models when the component mounts', () => {
    const component = <Button label="Click Me" />
    const data = {
      model: new Backbone.Model(),
    }
    data.model.on = jest.fn()
    mount(<EnhancedComponent component={component} data={data} />)
    expect(data.model.on).toHaveBeenCalled()
  })

  test('should stop listening for changes on models when the component unmounts', () => {
    const component = <Button label="Click Me" />
    const data = {
      model: new Backbone.Model(),
    }
    data.model.off = jest.fn()
    const c = mount(<EnhancedComponent component={component} data={data} />)
    c.unmount()
    expect(data.model.off).toHaveBeenCalled()
  })

  test('should update the state when the model changes', () => {
    const component = <Button />
    const data = {
      model: new Backbone.Model({label: 'Click Me'}),
    }
    const selector = ({model}) => ({label: model.label})
    const c = mount(
      <EnhancedComponent
        component={component}
        data={data}
        selector={selector}
      />,
    )
    expect(c.state('label')).toEqual('Click Me')
    data.model.set({label: "Don't Click Me"})
    expect(c.state('label')).toEqual("Don't Click Me")
  })

  test('should pass data along as props to child', () => {
    const component = <Button />
    const data = {
      label: 'Click Me',
    }
    const c = mount(<EnhancedComponent component={component} data={data} />)
    const child = c.find(Button)
    expect(child.props().label).toEqual('Click Me')
  })
})
