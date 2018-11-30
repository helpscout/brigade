import React, {Component, PureComponent} from 'react'

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

const BasicView = Marionette.View.extend({
  components: {
    '#card'() {
      return <Card>Hello</Card>
    },
  },

  template: _.template('<div id="card"></div>'),
})

brigade(BasicView)

const BasicApp = Marionette.Application.extend({
  region: '#app',

  onStart() {
    this.showView(new BasicView())
  },
})

class BasicAppWrapper extends PureComponent {
  componentDidMount() {
    const app = new BasicApp()
    app.start()
  }

  render() {
    return <div id="app" />
  }
}

class ModelAndCollection extends Component {
  static defaultProps = {
    addItem: () => {},
    items: [],
    list: {},
    updateVersion: () => {},
  }

  render() {
    const {
      addItem,
      items,
      list: {name, version},
      updateVersion,
    } = this.props

    return (
      <div>
        <h1>
          {name} v{version}
        </h1>
        <ul>
          {items.map(({id, name}) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <button onClick={addItem}>Add item</button> or{' '}
        <button onClick={updateVersion}>Update version</button>
      </div>
    )
  }
}

const BasicModelAndCollectionView = Marionette.View.extend({
  components() {
    return {
      '#list': (
        <ModelAndCollection
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
    this.items.add({
      id: this.items.length + 1,
      name: `Item ${this.items.length + 1}`,
    })
  },

  updateVersion() {
    this.list.set('version', this.list.get('version') + 1)
  },

  template: _.template('<div id="list"></div>'),
})

brigade(BasicModelAndCollectionView)

const BasicModelAndCollectionApp = Marionette.Application.extend({
  region: '#app',

  onStart() {
    this.showView(new BasicModelAndCollectionView())
  },
})

class BasicModelAndCollectionAppWrapper extends PureComponent {
  componentDidMount() {
    const app = new BasicModelAndCollectionApp()
    app.start()
  }

  render() {
    return <div id="app" />
  }
}

storiesOf('Basic', module)
  .add('Basic', () => <BasicAppWrapper />)
  .add('Basic Model & Collection', () => <BasicModelAndCollectionAppWrapper />)
