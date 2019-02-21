import React from 'react'
import {storiesOf} from '@storybook/react'
import ViewWrapper from '../../common/components/ViewWrapper'
import Backbone from 'backbone'
import TaskSpec from '../../utils/TaskSpec'
import TodoAppView from './views/TodoAppView'
import createStore from '../../../src/util/createStore'
import todoReducers from './reducers'
import {faker} from '@helpscout/helix'
import createExternalStateReducer from '../../../src/util/createExternalStateReducer'
import ExternalState from './ExternalState.md'
import withReadme from 'storybook-readme/with-readme'
import makeListModel from '../../utils/makeListModel'

const stories = storiesOf('StatefulReactView', module)

stories.add(
  'External State',
  withReadme(ExternalState, () => {
    // State lives in Backbone...
    const model = new Backbone.Model(makeListModel())
    const collection = new Backbone.Collection(TaskSpec.generate(3))

    // Create externalStateReducers to allow us to control the state of these reducers externally,
    // i.e. when models/collections change
    const {reducer: todos, reset: resetTodos} = createExternalStateReducer(
      'todos',
      [],
    )
    const {reducer: meta, reset: resetMeta} = createExternalStateReducer(
      'meta',
      [],
    )
    const reducers = {
      ...todoReducers,
      todos,
      meta,
    }

    const preloadedState = {
      todos: collection.toJSON(),
      meta: model.toJSON(),
    }

    const addTodo = todo => collection.add({...todo, id: faker.random.uuid()()})
    const removeTodo = id => collection.remove(id)
    const reset = () =>
      new Promise(resolve => {
        setTimeout(() => {
          model.set(makeListModel())
          collection.reset(TaskSpec.generate(3))
          resolve()
        }, 1000)
      })
    const extraArgument = {addTodo, removeTodo, reset}

    const store = createStore({preloadedState, reducers, extraArgument})

    // Manually dispatch the `reset` actions provided by createExternalStateReducer()
    model.on('change sync', () => store.dispatch(resetMeta(model.toJSON())))
    collection.on('change sync reset add remove', () =>
      store.dispatch(resetTodos(collection.toJSON())),
    )

    return <ViewWrapper renderView={() => new TodoAppView({store})} />
  }),
)
