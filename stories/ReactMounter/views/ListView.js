import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import React from 'react'
import {ReactMounter} from '../../../src'

import List from '../components/List'
import template from '../templates/template'

const ListView = ReactMounter(
  Marionette.ItemView.extend({
    components() {
      return {
        '#page': (
          <List
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
  }),
)

export default ListView
