import Backbone from 'backbone'
import {EnhancedComponent} from '..'
import {BrigadeStore} from '../../createStore/createStore'
import connect from '../../connect'
import React from 'react'
import {mount} from 'enzyme'

describe('EnhancedComponent', () => {
  const Button = ({label}) => <button>{label}</button>

  test('should be able to render non-instantiated React components', () => {
    const data = {
      model: new Backbone.Model(),
    }
    data.model.on = jest.fn()
    const wrapper = mount(<EnhancedComponent component={Button} data={data} />)

    expect(data.model.on).toHaveBeenCalled()
    expect(wrapper.find('button').length).toBe(1)
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

  test('should create a store on init', () => {
    const component = <Button />
    const data = {
      model: new Backbone.Model(),
    }
    const c = mount(<EnhancedComponent component={component} data={data} />)

    expect(c.instance().store instanceof BrigadeStore).toBe(true)
  })

  test('should create a store on init', () => {
    const component = <Button />
    const data = {
      model: new Backbone.Model({label: 'Click Me'}),
    }
    const c = mount(<EnhancedComponent component={component} data={data} />)

    expect(c.instance().store instanceof BrigadeStore).toBe(true)
  })

  test('should not pass props Brigade connected component', () => {
    const ConnectedComponent = connect(null)(Button)
    const data = {
      model: new Backbone.Model({label: 'Click Me'}),
    }
    const wrapper = mount(
      <EnhancedComponent component={ConnectedComponent} data={data} />,
    )

    const c = wrapper.find('button')

    expect(c.text()).not.toContain('Click Me')
  })

  test('should connect props to Brigade connected component', () => {
    const mapStateToProps = state => {
      return {
        label: state.model.label,
      }
    }
    const ConnectedComponent = connect(mapStateToProps)(Button)

    const data = {
      model: new Backbone.Model({label: 'Click Me'}),
    }

    const wrapper = mount(
      <EnhancedComponent component={ConnectedComponent} data={data} />,
    )

    const c = wrapper.find('button')

    expect(c.text()).toContain('Click Me')
  })

  test('should render instantiated ConnectedComponent', () => {
    const mapStateToProps = state => {
      return {
        label: state.model.label,
      }
    }
    const ConnectedComponent = connect(mapStateToProps)(Button)

    const data = {
      model: new Backbone.Model({label: 'Click Me'}),
    }

    const wrapper = mount(
      <EnhancedComponent component={<ConnectedComponent />} data={data} />,
    )

    const c = wrapper.find('button')

    expect(c.text()).toContain('Click Me')
  })

  test('should connect deeply nested component', () => {
    const mapStateToProps = state => {
      return {
        label: state.model.label,
      }
    }
    const ConnectedButton = connect(mapStateToProps)(Button)
    const App = () => {
      return (
        <div>
          <section>
            <ConnectedButton />
          </section>
        </div>
      )
    }

    const data = {
      model: new Backbone.Model({label: 'Click Me'}),
    }

    const wrapper = mount(<EnhancedComponent component={App} data={data} />)
    const c = wrapper.find('button')

    expect(c.text()).toContain('Click Me')
  })

  test('should not re-render on change if specified + using store for state', () => {
    const mapStateToProps = state => {
      return {
        label: state.model.label,
      }
    }
    const ConnectedButton = connect(mapStateToProps)(Button)
    const App = () => {
      return (
        <div>
          <section>
            <ConnectedButton />
          </section>
        </div>
      )
    }

    const model = new Backbone.Model({label: 'Click Me'})

    const data = {
      model,
    }

    const spy = jest.fn()
    const wrapper = mount(
      <EnhancedComponent component={App} data={data} useStore />,
    )
    wrapper.instance().render = spy

    model.set('label', 'Super Click Me')

    expect(spy).not.toHaveBeenCalled()

    model.set('label', 'One')
    model.set('label', 'Two')
    model.set('label', 'Three')

    expect(spy).not.toHaveBeenCalled()

    const c = wrapper.find('button')

    expect(c.text()).toBe('Three')
  })

  test('should not re-render on change if rendering connected component', () => {
    const mapStateToProps = state => {
      return {
        label: state.model.label,
      }
    }
    const ConnectedButton = connect(mapStateToProps)(Button)
    const App = () => {
      return (
        <div>
          <section>
            <ConnectedButton />
          </section>
        </div>
      )
    }
    const ConnectedApp = connect()(App)

    const model = new Backbone.Model({label: 'Click Me'})

    const data = {
      model,
    }

    const spy = jest.fn()
    const wrapper = mount(
      <EnhancedComponent component={ConnectedApp} data={data} />,
    )
    wrapper.instance().render = spy

    model.set('label', 'Super Click Me')

    expect(spy).not.toHaveBeenCalled()

    model.set('label', 'One')
    model.set('label', 'Two')
    model.set('label', 'Three')

    expect(spy).not.toHaveBeenCalled()

    const c = wrapper.find('button')

    expect(c.text()).toBe('Three')
  })
})
