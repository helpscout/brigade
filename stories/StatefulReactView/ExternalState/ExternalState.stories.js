import React from 'react'
import {storiesOf} from '@storybook/react'
import ViewWrapper from '../../common/components/ViewWrapper'
import Backbone from 'backbone'
import TaskSpec from '../../utils/TaskSpec'
import createStore from '../../../src/util/createStore'
import internalReducers from './reducers'
import ExternalState from './ExternalState.md'
import withReadme from 'storybook-readme/with-readme'
import makeListModel from '../../utils/makeListModel'
import Marionette from 'backbone.marionette'
import StatefulReactView from '../../../src/hoc/StatefulReactView'
import TodoApp from './components/App'

const stories = storiesOf('StatefulReactView', module)

export const getMetaModel = function() {
  const model = new Backbone.Model(makeListModel())
  // Fake fetching from the server
  model.fetch = () =>
    new Promise(resolve =>
      setTimeout(() => {
        model.set(makeListModel())
        resolve()
      }, 1000),
    )
  return model
}

// A React-Redux application
const TodoAppView = StatefulReactView().extend({
  template() {
    return <TodoApp />
  },
})

// This View takes a Model and lets you set its `name`
const LegacyView = Marionette.ItemView.extend({
  initialize() {
    this.listenTo(this.model, 'change', this.render)
  },
  template({name}) {
    return `
    <div>
      <h3>Legacy Backbone View</h3>
      <input type="text" class="js-name" value="${name}"/>
      <button>Update Name</button>
    </div>
    <hr/>
    `
  },
  ui: {
    input: '.js-name',
    button: 'button',
  },
  events: {
    'click @ui.button': 'updateName',
  },
  updateName() {
    const name = this.ui.input.val()
    this.model.set({name})
  },
})

// Simple Layout that renders a Backbone View in the header and the StatefulReactView in the body
const Layout = Marionette.Layout.extend({
  template() {
    return `<div class="js-header"></div><div class="js-body"></div>`
  },
  regions: {
    header: '.js-header',
    body: '.js-body',
  },
  onShow() {
    const {store} = this.options
    const {model} = this
    this.header.show(new LegacyView({model}))
    this.body.show(new TodoAppView({store}))
  },
})

stories.add(
  'External State',
  withReadme(ExternalState, () => {
    // A portion of state lives inside a Backbone Model we cannot replace for Reasons™
    const model = getMetaModel()

    const refreshMeta = () => model.fetch()
    // Expose an external method inside the React/Redux app
    const extraArgument = { refreshMeta }

    // createStore will auto-bind any Models or Collections it finds in the reducers list
    const reducers = {
      meta: model,
      ...internalReducers,
    }
    const preloadedState = {
      meta: model.toJSON(),
      todos: TaskSpec.generate(2, 4),
    }
    const store = createStore({ preloadedState, reducers, extraArgument })
    return <ViewWrapper renderView={() => new Layout({store, model})} />
  }),
)
