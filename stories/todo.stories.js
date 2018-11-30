import React, {PureComponent} from 'react'

import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {linkTo} from '@storybook/addon-links'

// Story dependencies
import _ from 'underscore'
import jquery from 'jquery'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import brigade from '../src'
import Card from '@helpscout/hsds-react/components/Card'

class Todos extends PureComponent {
  render() {
    return <Card>Todos</Card>
  }
}

const TodosView = Marionette.View.extend({
  components: {
    '#todos'() {
      return {
        component: <Todos />,
      }
    },
  },

  template: _.template('<div id="todos"></div>'),
})

brigade(TodosView)

const TodoApp = Marionette.Application.extend({
  region: '#app',

  onStart() {
    this.showView(new TodosView())
  },
})

class TodoAppWrapper extends PureComponent {
  componentDidMount() {
    this.initTodoApp()
  }

  initTodoApp() {
    const app = new TodoApp()
    app.start()
  }

  render() {
    return (
      <div ref={node => (this.node = node)}>
        <div id="app" />
      </div>
    )
  }
}

storiesOf('Todo', module).add('default', () => <TodoAppWrapper />)
