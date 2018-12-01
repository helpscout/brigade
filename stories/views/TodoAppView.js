import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import React from 'react'
import brigade from '../../src'

import TodoApp from '../components/Todo/App'
import template from '../templates/template'

export const TodoAppView = brigade(
  Marionette.View.extend({
    components() {
      return {
        '#page': {
          component: <TodoApp title="Todo List" />,
          initialState: {
            todos: this.todos,
          },
          externalActions: {
            addTodo: this.addTodo,
            removeTodo: this.removeTodo,
          }
        }
      }
    },

    initialize() {
      this.todos = new Backbone.Collection([
        { id: Date.now(), task: 'Learn to use Brigade' },
      ])
      this.addTodo = this.addTodo.bind(this)
      this.removeTodo = this.removeTodo.bind(this)
    },

    addTodo(todo) {
      this.todos.add({ ...todo, id: Date.now() })
    },

    removeTodo(id) {
      this.todos.remove(id)
    },

    template,
  })
)

export default brigade(TodoAppView)
