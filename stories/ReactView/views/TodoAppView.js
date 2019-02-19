import React from 'react'
import Marionette from 'backbone.marionette'
import TodoApp from '../components/Todo/App'
import ReactView from '../../../src/hoc/ReactView/ReactView'
import TaskSpec from '../../utils/TaskSpec'
import {faker} from '@helpscout/helix'

export const makeListModel = function() {
  return {name: `${faker.name.firstName()()}'s List`}
}
export const TodoAppView = ReactView(
  Marionette.ItemView.extend({
    initialize() {
      this.addTodo = this.addTodo.bind(this)
      this.removeTodo = this.removeTodo.bind(this)
      this.reset = this.reset.bind(this)

      this.listenTo(this.collection, 'change reset add remove', this.render)
      this.listenTo(this.model, 'change reset', this.render)
    },

    template(props) {
      return <TodoApp {...props} />
    },
    // These are passed into `template` ^ as props
    serializeData() {
      // Backbone state can be stored all sorts of ways. We can mix in whatever we want to pass in as props in this fashion
      const {collection, isLoading, model, addTodo, removeTodo, reset} = this
      return {
        todos: collection.toJSON(),
        listName: model.get('name'),
        isLoading,
        addTodo,
        removeTodo,
        reset,
      }
    },

    addTodo(todo) {
      this.collection.add({...todo, id: faker.random.uuid()()})
    },

    removeTodo(id) {
      this.collection.remove(id)
    },

    reset() {
      // We can store state where we want in Backbone world, for better or worse
      this.isLoading = true
      this.render()
      return new Promise(resolve => {
        setTimeout(() => {
          this.isLoading = false
          this.model.set(makeListModel())
          this.collection.reset(TaskSpec.generate(3))
          resolve()
        }, 1000)
      })
    },
  }),
)

export default TodoAppView
