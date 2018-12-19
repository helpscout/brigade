import React, {Component} from 'react'
import {COMPONENT_UPDATED} from '../ReactView'
import {ReactView} from '../index'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import {destroyRegion, makeRegion} from '../../../util/regionHelpers'

describe('ReactView tests', () => {
  let componentWillMount,
    render,
    componentWillReceiveProps,
    componentDidMount,
    componentWillUnmount,
    region,
    ComponentView,
    onBeforeRender,
    onRender,
    onShow,
    onClose,
    model
  class HeaderComponent extends Component {
    constructor() {
      super()
      this.state = {counter: 0}
      this.updateCounter = this.updateCounter.bind(this)
    }
    render() {
      render()
      return (
        <div className="react-header">
          <h1>Hello, {this.props.name}!</h1>
          <h2>Counter: {this.state.counter}</h2>
          <button onClick={this.updateCounter} />
        </div>
      )
    }
    updateCounter() {
      let {counter} = this.state
      counter++
      this.setState({counter})
    }
    componentWillMount() {
      componentWillMount()
    }
    componentWillReceiveProps() {
      componentWillReceiveProps()
    }
    componentDidMount() {
      componentDidMount()
    }
    componentWillUnmount() {
      componentWillUnmount()
    }
  }

  beforeEach(() => {
    region = makeRegion()
    componentWillMount = jest.fn()
    render = jest.fn()
    componentWillReceiveProps = jest.fn()
    componentDidMount = jest.fn()
    componentWillUnmount = jest.fn()
    onBeforeRender = jest.fn()
    onRender = jest.fn()
    onShow = jest.fn()
    onClose = jest.fn()
    ComponentView = ReactView(
      Marionette.ItemView.extend({
        template(props) {
          return <HeaderComponent {...props} />
        },
        onBeforeRender,
        onRender,
        onShow,
        onClose,
      }),
    )
    model = new Backbone.Model({name: 'Jeff'})
  })
  afterEach(() => {
    destroyRegion(region)
  })

  describe('Error handling', () => {
    let warn
    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    test('should warn when used on a non-ItemView', () => {
      const CollectionView = ReactView(Marionette.CollectionView.extend({}))
      const collectionView = new CollectionView()
      expect(warn).toHaveBeenCalled()
    })
  })

  describe('event / callback tests', () => {
    test('should invoke lifecycle callbacks at the appropriate time', () => {
      const view = new ComponentView({model})
      expect(onBeforeRender).not.toHaveBeenCalled()
      expect(onRender).not.toHaveBeenCalled()
      expect(onShow).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
      view.render()
      expect(onBeforeRender).toHaveBeenCalled()
      expect(onRender).toHaveBeenCalled()
      expect(onShow).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
      region.show(view)
      expect(onShow).toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
      region.close(view)
      expect(onClose).toHaveBeenCalled()
    })

    test('should trigger lifecycle events at the appropriate time', () => {
      const onBeforeRender = jest.fn()
      const onItemBeforeRender = jest.fn()
      const onRender = jest.fn()
      const onItemRendered = jest.fn()
      const onShow = jest.fn()
      const onClose = jest.fn()

      const view = new ComponentView({model})
      view.on('before:render', onBeforeRender)
      view.on('item:before:render', onItemBeforeRender)
      view.on('render', onRender)
      view.on('item:rendered', onItemRendered)
      view.on('show', onShow)
      view.on('close', onClose)

      expect(onBeforeRender).not.toHaveBeenCalled()
      expect(onItemBeforeRender).not.toHaveBeenCalled()
      expect(onRender).not.toHaveBeenCalled()
      expect(onItemBeforeRender).not.toHaveBeenCalled()
      expect(onShow).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
      view.render()
      expect(onBeforeRender).toHaveBeenCalled()
      expect(onItemBeforeRender).toHaveBeenCalled()
      expect(onRender).toHaveBeenCalled()
      expect(onItemRendered).toHaveBeenCalled()
      expect(onShow).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
      region.show(view)
      expect(onShow).toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
      region.close(view)
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('rendering tests', () => {
    test('should render the correct name', () => {
      const view = new ComponentView({model})
      region.show(view)
      expect(view.$el).toContainText('Hello, Jeff!')
      model.set('name', 'Rick')
      view.render()
      expect(view.$el).toContainText('Hello, Rick!')
    })

    test('should invoke React lifecycle events at the appropriate time', () => {
      const view = new ComponentView({model})
      expect(render).not.toHaveBeenCalled()
      expect(componentWillMount).not.toHaveBeenCalled()
      region.show(view)
      expect(render).toHaveBeenCalled()
      expect(componentWillMount).toHaveBeenCalled()
      expect(componentDidMount).toHaveBeenCalled()
      expect(componentWillReceiveProps).not.toHaveBeenCalled()
      expect(view.$el).toContainText('Hello, Jeff!')

      render.mockReset()
      expect(render).not.toHaveBeenCalled()
      model.set('name', 'Rick')
      view.render()
      expect(render).toHaveBeenCalled()
      expect(componentWillReceiveProps).toHaveBeenCalled()
      expect(view.$el).toContainText('Hello, Rick!')
    })

    test('should update internal state, re-render component', () => {
      const componentUpdated = jest.fn()
      const view = new ComponentView({model})
      view.on(COMPONENT_UPDATED, componentUpdated)
      region.show(view)
      expect(view.$el).toContainText('Counter: 0')
      view.$('button').click()
      expect(view.$el).toContainText('Counter: 1')
      expect(componentUpdated).toHaveBeenCalled()
    })
  })

  describe('CollectionView tests', () => {
    let collection, CollectionView
    beforeEach(() => {
      collection = new Backbone.Collection([
        {id: 1, name: 'Jeff'},
        {id: 2, name: 'Steve'},
        {id: 3, name: 'Rick'},
      ])
      CollectionView = Marionette.CollectionView.extend({
        itemView: ComponentView,
      })
    })
    test('should render an ItemView for each model in the collection', () => {
      const view = new CollectionView({collection})
      region.show(view)
      expect(view.$('.react-header').length).toBe(3)
      expect(view.$el).toContainText('Hello, Jeff!')
      expect(view.$el).toContainText('Hello, Steve!')
      expect(view.$el).toContainText('Hello, Rick!')
    })

    test('should remove ItemView when model removed from collection', () => {
      const view = new CollectionView({collection})
      region.show(view)
      expect(view.$('.react-header').length).toBe(3)
      expect(view.$el).toContainText('Hello, Steve!')
      expect(componentWillUnmount).not.toHaveBeenCalled()
      collection.remove(collection.get(2))
      expect(collection.length).toBe(2)
      expect(componentWillUnmount).toHaveBeenCalled()
      expect(view.$('.react-header').length).toBe(2)
      expect(view.$el).not.toContainText('Hello, Steve!')
    })

    test('should re-render an ItemView in the collection, triggering appropriate events on the CollectionView', () => {
      const view = new CollectionView({collection})
      region.show(view)
      const onItemBeforeRender = jest.fn()
      const onBeforeRender = jest.fn()
      const onItemRender = jest.fn()
      const onItemRendered = jest.fn()
      view.on('itemview:item:before:render', onItemBeforeRender)
      view.on('itemview:before:render', onBeforeRender)
      view.on('itemview:render', onItemRender)
      view.on('itemview:item:rendered', onItemRendered)
      expect(view.$el).toContainText('Hello, Jeff!')
      render.mockReset()

      const jeff = collection.get(2)
      jeff.set('name', 'Roger')

      // CollectionView doesn't trigger automatically when model attrs change, have to manually trigger it
      expect(render).not.toHaveBeenCalled()
      expect(onItemBeforeRender).not.toHaveBeenCalled()
      expect(onItemRendered).not.toHaveBeenCalled()
      expect(componentWillReceiveProps).not.toHaveBeenCalled()

      view.children.findByModel(jeff).render()
      expect(view.$el).toContainText('Hello, Roger!')

      expect(render).toHaveBeenCalled()
      expect(onItemBeforeRender).toHaveBeenCalled()
      expect(onItemRendered).toHaveBeenCalled()
      expect(onBeforeRender).toHaveBeenCalled()
      expect(onItemRender).toHaveBeenCalled()
      expect(componentWillReceiveProps).toHaveBeenCalled()
    })
  })
})
