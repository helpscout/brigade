import Backbone from 'backbone'
import {EnhancedComponent} from '..'
import {BrigadeStore} from '../../createStore/createStore'
import connect from '../../connect'
import React from 'react'
import {mount} from 'enzyme'

describe('EnhancedComponent', () => {
  const CLICKED = 'clicked'
  const Button = ({label, onClick = () => {}}) => (
    <button onClick={e => e.preventDefault && onClick(CLICKED)}>{label}</button>
  )

  test('should be able to render non-instantiated React components', () => {
    const wrapper = mount(<EnhancedComponent component={Button} />)
    expect(wrapper.find('button').length).toBe(1)
  })

  test('should listen for changes on collections when the component mounts', () => {
    const collection = new Backbone.Collection([])
    const component = <Button label="Click Me" collection={collection} />
    collection.on = jest.fn()
    mount(<EnhancedComponent component={component} />)
    expect(collection.on).toHaveBeenCalled()
  })

  test('should listen for changes on models when the component mounts', () => {
    const model = new Backbone.Model()
    const component = <Button label="Click Me" model={model} />
    model.on = jest.fn()
    mount(<EnhancedComponent component={component} />)
    expect(model.on).toHaveBeenCalled()
  })

  test('should stop listening for changes on collections when the component unmounts', () => {
    const collection = new Backbone.Collection([])
    const component = <Button label="Click Me" collection={collection} />
    collection.off = jest.fn()
    const c = mount(<EnhancedComponent component={component} />)
    c.unmount()
    expect(collection.off).toHaveBeenCalled()
  })

  test('should stop listening for changes on models when the component unmounts', () => {
    const model = new Backbone.Model()
    const component = <Button label="Click Me" model={model} />
    model.off = jest.fn()
    const c = mount(<EnhancedComponent component={component} />)
    c.unmount()
    expect(model.off).toHaveBeenCalled()
  })

  test('should update the state when the collection is added to', () => {
    const collection = new Backbone.Collection([])
    const component = <Button collection={collection} />

    const c = mount(<EnhancedComponent component={component} />)

    expect(c.state('collection')).toHaveLength(0)
    collection.add(new Backbone.Model({name: 'hello'}))
    expect(c.state('collection')).toHaveLength(1)
    collection.add(new Backbone.Model({name: 'world'}))
    expect(c.state('collection')).toHaveLength(2)
  })

  test('should update the state when models are changed in the collection', () => {
    const model1 = new Backbone.Model({id: 1, name: 'hello'})
    const model2 = new Backbone.Model({id: 2, name: 'world'})
    const collection = new Backbone.Collection([model1, model2])
    const component = <Button collection={collection} />

    const c = mount(<EnhancedComponent component={component} />)

    expect(c.state('collection')[0].name).toEqual('hello')
    expect(c.state('collection')[1].name).toEqual('world')

    model1.set('name', 'hey')
    expect(c.state('collection')[0].name).toEqual('hey')

    model2.set('name', 'you')
    expect(c.state('collection')[1].name).toEqual('you')
  })

  test('should update the state when models are removed from the collection', () => {
    const model1 = new Backbone.Model({id: 1, name: 'hello'})
    const model2 = new Backbone.Model({id: 2, name: 'world'})
    const collection = new Backbone.Collection([model1, model2])
    const component = <Button collection={collection} />

    const c = mount(<EnhancedComponent component={component} />)

    expect(c.state('collection')).toHaveLength(2)
    collection.remove(model2)
    expect(c.state('collection')).toHaveLength(1)
    collection.remove(model1)
    expect(c.state('collection')).toHaveLength(0)
  })

  test('should update the state when the collection is reset', () => {
    const collection = new Backbone.Collection([
      new Backbone.Model({name: 'Click Me'}),
    ])
    const component = <Button collection={collection} />

    const c = mount(<EnhancedComponent component={component} />)

    expect(c.state('collection')).toHaveLength(1)
    collection.reset([])
    expect(c.state('collection')).toHaveLength(0)
  })

  test('should update the state when the model changes', () => {
    const model = new Backbone.Model({label: 'Click Me'})
    const component = <Button model={model} />

    const c = mount(<EnhancedComponent component={component} />)

    expect(c.state('model').label).toEqual('Click Me')
    model.set({label: "Don't Click Me"})
    expect(c.state('model').label).toEqual("Don't Click Me")
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
    const initialState = {
      model: new Backbone.Model({label: 'Click Me'}),
    }
    const wrapper = mount(
      <EnhancedComponent
        component={ConnectedComponent}
        initialState={initialState}
      />,
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

    const initialState = {
      model: new Backbone.Model({label: 'Click Me'}),
    }

    const wrapper = mount(
      <EnhancedComponent
        component={ConnectedComponent}
        initialState={initialState}
      />,
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

    const initialState = {
      model: new Backbone.Model({label: 'Click Me'}),
    }

    const wrapper = mount(
      <EnhancedComponent
        component={<ConnectedComponent />}
        initialState={initialState}
      />,
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

    const initialState = {
      model: new Backbone.Model({label: 'Click Me'}),
    }

    const wrapper = mount(
      <EnhancedComponent component={App} initialState={initialState} />,
    )
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

    const initialState = {
      model,
    }

    const spy = jest.fn()
    const wrapper = mount(
      <EnhancedComponent component={App} initialState={initialState} />,
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

    const initialState = {
      model,
    }

    const spy = jest.fn()
    const wrapper = mount(
      <EnhancedComponent
        component={ConnectedApp}
        initialState={initialState}
      />,
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

  test('should not re-render on collection change if rendering connected component', () => {
    const mapStateToProps = state => {
      return {
        members: state.members,
      }
    }

    const MembersList = ({members}) => (
      <div className="members">
        {members.map(member => (
          <div className="member" key={member.id}>
            {member.firstName}
          </div>
        ))}
      </div>
    )
    const ConnectedMembersList = connect(mapStateToProps)(MembersList)

    const App = () => {
      return (
        <div>
          <section>
            <ConnectedMembersList />
          </section>
        </div>
      )
    }
    const ConnectedApp = connect()(App)

    const members = new Backbone.Collection([
      {
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
        id: 'skiwsgaar',
      },
    ])

    const initialState = {
      members,
    }

    const spy = jest.fn()
    const wrapper = mount(
      <EnhancedComponent
        component={ConnectedApp}
        initialState={initialState}
      />,
    )
    wrapper.instance().render = spy

    expect(wrapper.find('div.member').length).toBe(1)

    members.add({
      firstName: 'Toki',
      lastName: 'Wartooth',
      id: 'toki',
    })
    wrapper.update()

    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('div.member').length).toBe(2)
    expect(wrapper.find('div.members').text()).toContain('Toki')

    members.add({
      firstName: 'William',
      lastName: 'Murderface',
      id: 'murderface',
    })
    wrapper.update()

    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('div.member').length).toBe(3)
    expect(wrapper.find('div.members').text()).toContain('William')

    members.findWhere({id: 'murderface'}).set({
      firstName: 'Murderface',
    })

    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('div.member').length).toBe(3)
    expect(wrapper.find('div.members').text()).toContain('Murderface')

    members.remove({id: 'murderface'})
    wrapper.update()

    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('div.member').length).toBe(2)
    expect(wrapper.find('div.members').text()).not.toContain('Murderface')
  })

  test('should pass state as first argument to external action', () => {
    const spy = jest.fn()
    const state = {item: 'A'}

    const ConnectedButton = connect(
      state => state,
      store => {
        const {onClick} = store.getExternalActions()
        return {onClick}
      },
    )(Button)

    const wrapper = mount(
      <EnhancedComponent
        component={ConnectedButton}
        initialState={state}
        externalActions={{onClick: spy}}
      />,
    )

    wrapper.find(Button).simulate('click')
    expect(spy).toHaveBeenCalledWith(state, CLICKED)
  })

  test('should not pass state as first argument to stateless external action', () => {
    const spy = jest.fn()
    const state = {item: 'A'}

    const ConnectedButton = connect(
      state => state,
      store => {
        const {onClick} = store.getStatelessExternalActions()
        return {onClick}
      },
    )(Button)

    const wrapper = mount(
      <EnhancedComponent
        component={ConnectedButton}
        initialState={state}
        externalActions={{onClick: spy}}
      />,
    )

    wrapper.find(Button).simulate('click')
    expect(spy).toHaveBeenCalledWith(CLICKED)
  })
})
