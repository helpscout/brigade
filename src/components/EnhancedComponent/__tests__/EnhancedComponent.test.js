import Backbone from 'backbone'
import {EnhancedComponent} from '..'
import React from 'react'
import {mount} from 'enzyme'

describe('EnhancedComponent', () => {
  const Button = ({label}) => <button>{label}</button>

  test('should listen for changes on collections when the component mounts', () => {
    const component = <Button label="Click Me" />
    const data = {
      collection: new Backbone.Collection([]),
    }
    data.collection.on = jest.fn()
    mount(<EnhancedComponent component={component} data={data} />)
    expect(data.collection.on).toHaveBeenCalled()
  })

  test('should listen for changes on models when the component mounts', () => {
    const component = <Button label="Click Me" />
    const data = {
      model: new Backbone.Model(),
    }
    data.model.on = jest.fn()
    mount(<EnhancedComponent component={component} data={data} />)
    expect(data.model.on).toHaveBeenCalled()
  })

  test('should stop listening for changes on collections when the component unmounts', () => {
    const component = <Button label="Click Me" />
    const data = {
      collection: new Backbone.Collection([]),
    }
    data.collection.off = jest.fn()
    const c = mount(<EnhancedComponent component={component} data={data} />)
    c.unmount()
    expect(data.collection.off).toHaveBeenCalled()
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

  test('should update the state when the collection is added to', () => {
    const component = <Button />
    const data = {
      collection: new Backbone.Collection([]),
    }
    const selector = ({collection}) => {
      return {
        label: collection.map(m => m.name).join(' '),
      }
    }
    const c = mount(
      <EnhancedComponent
        component={component}
        data={data}
        selector={selector}
      />,
    )
    expect(c.state('label')).toEqual('')
    data.collection.add(new Backbone.Model({name: 'hello'}))
    expect(c.state('label')).toEqual('hello')
    data.collection.add(new Backbone.Model({name: 'world'}))
    expect(c.state('label')).toEqual('hello world')
  })

  test('should update the state when models are changed in the collection', () => {
    const component = <Button />
    const model1 = new Backbone.Model({id: 1, name: 'hello'})
    const model2 = new Backbone.Model({id: 2, name: 'world'})
    const data = {
      collection: new Backbone.Collection([model1, model2]),
    }
    const selector = ({collection}) => {
      return {
        label: collection.map(m => m.name).join(' '),
      }
    }
    const c = mount(
      <EnhancedComponent
        component={component}
        data={data}
        selector={selector}
      />,
    )
    expect(c.state('label')).toEqual('hello world')
    model1.set('name', 'hey')
    expect(c.state('label')).toEqual('hey world')
    model2.set('name', 'you')
    expect(c.state('label')).toEqual('hey you')
  })

  test('should update the state when models are removed from the collection', () => {
    const component = <Button />
    const model1 = new Backbone.Model({id: 1, name: 'hello'})
    const model2 = new Backbone.Model({id: 2, name: 'world'})
    const data = {
      collection: new Backbone.Collection([model1, model2]),
    }
    const selector = ({collection}) => {
      return {
        label: collection.map(m => m.name).join(' '),
      }
    }
    const c = mount(
      <EnhancedComponent
        component={component}
        data={data}
        selector={selector}
      />,
    )
    expect(c.state('label')).toEqual('hello world')
    data.collection.remove(model2)
    expect(c.state('label')).toEqual('hello')
    data.collection.remove(model1)
    expect(c.state('label')).toEqual('')
  })

  test('should update the state when the collection is reset', () => {
    const component = <Button />
    const data = {
      collection: new Backbone.Collection([
        new Backbone.Model({name: 'Click Me'}),
      ]),
    }
    const selector = ({collection}) => {
      return {
        label: collection.map(m => m.name).join(' '),
      }
    }
    const c = mount(
      <EnhancedComponent
        component={component}
        data={data}
        selector={selector}
      />,
    )
    expect(c.state('label')).toEqual('Click Me')
    data.collection.reset([])
    expect(c.state('label')).toEqual('')
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
