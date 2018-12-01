import _ from 'underscore'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import React from 'react'
import brigade from '../../src'

import BasicComponent from '../components/BasicComponent'
import ListComponent, { ConnectedListComponent } from '../components/ListComponent'
import TodoApp from '../components/TodoApp/TodoApp'

const template = _.template('<div id="page"></div>')

export const BasicView = brigade(
  Marionette.View.extend({
    components: {
      '#page': <BasicComponent />,
    },

    template,
  })
)

export const ModelCollectionView = brigade(
  Marionette.View.extend({
    components() {
      return {
        '#page': (
          <ListComponent
            addItem={this.addItem}
            items={this.items}
            list={this.list}
            updateVersion={this.updateVersion}
          />
        ),
      }
    },

    initialize() {
      this.items = new Backbone.Collection([
        {id: 1, name: 'Item 1'},
        {id: 2, name: 'Item 2'},
      ])
      this.list = new Backbone.Model({
        name: 'Items',
        version: 1,
      })
      this.addItem = this.addItem.bind(this)
      this.updateVersion = this.updateVersion.bind(this)
    },

    addItem() {
      const id = this.items.length + 1
      this.items.add({id, name: `Item ${id}`})
    },

    updateVersion() {
      this.list.set('version', this.list.get('version') + 1)
    },

    template,
  })
)

export const ConnectedModelCollectionView = brigade(
  Marionette.View.extend({
    components() {
      return {
        '#page': {
          component: <ConnectedListComponent />,
          initialState: {
            items: this.items,
            list: this.list,
          },
          externalActions: {
            addItem: this.addItem,
            updateVersion: this.updateVersion,
          }
        }
      }
    },

    initialize() {
      this.items = new Backbone.Collection([
        {id: 1, name: 'Item 1'},
        {id: 2, name: 'Item 2'},
      ])
      this.list = new Backbone.Model({
        name: 'Items',
        version: 1,
      })
      this.addItem = this.addItem.bind(this)
      this.updateVersion = this.updateVersion.bind(this)
    },

    addItem() {
      const id = this.items.length + 1
      this.items.add({id, name: `Item ${id}`})
    },

    updateVersion() {
      this.list.set('version', this.list.get('version') + 1)
    },

    template,
  })
)

export const TodoView = brigade(
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
          }
        }
      }
    },

    initialize() {
      this.todos = new Backbone.Collection([
        { id: Date.now(), task: 'Learn to use Brigade' },
      ])
      this.addTodo = this.addTodo.bind(this)
    },

    addTodo(todo) {
      this.todos.add({ ...todo, id: Date.now() })
    },

    template,
  })
)
