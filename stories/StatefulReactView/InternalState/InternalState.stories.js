import React from 'react'
import {storiesOf} from '@storybook/react'
import ViewWrapper from '../../common/components/ViewWrapper'
import TaskSpec from '../../utils/TaskSpec'
import TodoAppView from './views/TodoAppView'
import createStore from '../../../src/util/createStore'
import reducers from './reducers'
import InternalState from './InternalState.md'
import withReadme from 'storybook-readme/with-readme'
import makeListModel from '../../utils/makeListModel'

const stories = storiesOf('StatefulReactView', module)

stories.add(
  'Internal State',
  withReadme(InternalState, () => {
    const preloadedState = {
      todos: TaskSpec.generate(3),
      meta: makeListModel(),
    }
    const store = createStore({preloadedState, reducers})
    return <ViewWrapper renderView={() => new TodoAppView({store})} />
  }),
)
