import React from 'react'
import Marionette from 'backbone.marionette'
import TodoApp from '../components/App'
import StatefulReactView from '../../../../src/hoc/StatefulReactView'

const View = StatefulReactView(Marionette.ItemView)

const TodoAppView = View.extend({
  template() {
    return <TodoApp />
  },
})

export default TodoAppView
