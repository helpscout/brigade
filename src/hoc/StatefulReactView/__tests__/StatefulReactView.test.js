import React, { Component } from 'react'
import StatefulReactView from '../StatefulReactView'
import Marionette from 'backbone.marionette'
import {destroyRegion, makeRegion} from '../../../util/regionHelpers'
import createStore from '../../../util/createStore'
import { connect } from 'react-redux'

class Foo extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>
  }
}
const mapStateToProps = ({ name }) => ({ name })
const FooContainer = connect(mapStateToProps)(Foo)

describe('StatefulReactView tests', () => {
  let View, preloadedState, reducers, store, region

  beforeEach(() => {
    preloadedState = {
      name: 'Bob',
    }
    reducers = {
      name: (state='', action) => action.type === 'SET_NAME' ? action.name : state
    }
    store = createStore({ preloadedState, reducers })
    region = makeRegion()
    View = StatefulReactView(
      Marionette.ItemView.extend({
        template() {
          return <FooContainer/>
        },
      }),
    )
  })
  afterEach(() => {
    destroyRegion(region)
  })

  test('should render a StatefulReactView with data from store', () => {
    const view = new View({ store })
    region.show(view)
    expect(view.$el).toContainText('Hello, Bob!')
  })

  test('StatefulReactView defaults to ItemView when no param passed', () => {
    View = StatefulReactView()
    View = View.extend({
      template() {
        return <FooContainer/>
      },
    })
    const view = new View({ store })
    region.show(view)
    expect(view.$el).toContainText('Hello, Bob!')
  })

  test('content should update when state changes', () => {
    const view = new View({ store })
    region.show(view)
    expect(view.$el).toContainText('Hello, Bob!')
    store.dispatch({ type: 'SET_NAME', name: 'Jill'})
    expect(view.$el).toContainText('Hello, Jill!')
  })

  test('should be able to rerender', () => {
    const view = new View({ store })
    region.show(view)
    expect(view.$el).toContainText('Hello, Bob!')
    view.render()
    expect(view.$el).toContainText('Hello, Bob!')
    store.dispatch({ type: 'SET_NAME', name: 'Jill'})
    expect(view.$el).toContainText('Hello, Jill!')
  })
})
