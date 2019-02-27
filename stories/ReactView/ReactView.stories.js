import React, {Component} from 'react'
import Backbone from 'backbone'
import {storiesOf} from '@storybook/react'
import ViewWrapper from '../common/components/ViewWrapper'
import Marionette from 'backbone.marionette'
import TaskSpec from '../utils/TaskSpec'
import {ReactView} from '../../src'
import App from './components/Todo/App'
import {faker} from '@helpscout/helix'
import {getMetaModel} from '../StatefulReactView/ExternalState/ExternalState.stories'
import {Flexy, Page, Button} from '@helpscout/hsds-react/components'

const stories = storiesOf('ReactView', module)

class HeaderComponent extends Component {
  constructor() {
    super()
    this.state = {counter: 0}
    this.updateCounter = this.updateCounter.bind(this)
  }
  render() {
    const {updateCounter} = this
    const {name} = this.props
    const {counter} = this.state
    return (
      <Page>
        <Page.Card>
          <Page.Header render={({Title}) => <Title>Hello, {name}!</Title>} />
          <Page.Content>
            <Flexy>
              <Flexy.Item>Internal State Counter: {counter}</Flexy.Item>
              <Flexy.Item>
                <Button onClick={updateCounter}>Increment</Button>
              </Flexy.Item>
            </Flexy>
          </Page.Content>
        </Page.Card>
      </Page>
    )
  }
  updateCounter() {
    let {counter} = this.state
    counter++
    this.setState({counter})
  }
}

export const getTaskCollection = function() {
  const collection = new Backbone.Collection(TaskSpec.generate(2, 4))
  // Fake fetching from the server
  collection.fetch = () =>
    new Promise(resolve =>
      setTimeout(() => {
        collection.set(TaskSpec.generate(2, 4))
        resolve()
      }, 1000),
    )
  return collection
}

const SimpleReactView = ReactView(
  Marionette.ItemView.extend({
    template(props) {
      return <HeaderComponent {...props} />
    },
  }),
)

stories.add('Simple', () => {
  const model = new Backbone.Model({name: 'Jeff'})
  return <ViewWrapper renderView={() => new SimpleReactView({model})} />
})

stories.add('Layout', () => {
  const Layout = Marionette.Layout.extend({
    template() {
      return `
    <div>
      <h2>Layout containing a SimpleReactView</h2>
      <div class="js-region"></div>
      <label for="name">Name:</label>
      <input id="name" type="text"/>
      <button class="js-update-name">Update Name</button>
    </div>
    `
    },
    regions: {
      main: '.js-region',
    },
    ui: {
      input: 'input',
      button: '.js-update-name',
    },
    events: {
      'click @ui.button': 'updateName',
    },
    initialize() {
      this.listenTo(this.model, 'change', () => this.childView.render())
    },
    onShow() {
      this.childView = new SimpleReactView({model: this.model})
      this.main.show(this.childView)
    },
    updateName() {
      const name = this.ui.input.val()
      this.model.set({name})
    },
  })

  const model = new Backbone.Model({name: 'Jeff'})
  return <ViewWrapper renderView={() => new Layout({model})} />
})

stories.add('CollectionView', () => {
  const collection = new Backbone.Collection([
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Steve'},
    {id: 3, name: 'Rick'},
  ])
  const CollectionView = Marionette.CollectionView.extend({
    itemView: SimpleReactView,
  })
  return <ViewWrapper renderView={() => new CollectionView({collection})} />
})

stories.add('CompositeView', () => {
  const CompositeView = Marionette.CompositeView.extend({
    itemView: SimpleReactView,
    itemViewContainer: '.js-container',
    template() {
      return `
    <div>
      <h2>CompositeView containing an array of SimpleReactViews</h2>
      <ul class="js-container"></ul>
      <label for="name">Name:</label>
      <input id="name" type="text"/>
      <button class="js-add-button">Add Model</button>
    </div>
    `
    },
    regions: {
      main: '.js-region',
    },
    ui: {
      input: 'input',
      button: '.js-add-button',
    },
    events: {
      'click @ui.button': 'addModel',
    },
    addModel() {
      const name = this.ui.input.val()
      const model = new Backbone.Model({name})
      this.collection.add(model)
    },
  })

  const collection = new Backbone.Collection([
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Steve'},
    {id: 3, name: 'Rick'},
  ])
  return <ViewWrapper renderView={() => new CompositeView({collection})} />
})

stories.add('ToDo App', () => {
  const TodoAppView = ReactView(
    Marionette.ItemView.extend({
      initialize() {
        this.addTodo = this.addTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.reset = this.reset.bind(this)

        this.listenTo(this.collection, 'change reset add remove', this.render)
        this.listenTo(this.model, 'change reset', this.render)
      },

      template(props) {
        return <App {...props} />
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
        return Promise.all([
          this.model.fetch(),
          this.collection.fetch(),
        ]).finally(() => {
          this.isLoading = false
          this.render()
        })
      },
    }),
  )

  const model = getMetaModel()
  const collection = getTaskCollection()
  return <ViewWrapper renderView={() => new TodoAppView({model, collection})} />
})
