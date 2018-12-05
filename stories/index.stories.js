import React from 'react'
import { storiesOf } from '@storybook/react'
import BasicView from './views/BasicView'
import ListView from './views/ListView'
import ConnectedListView from './views/ConnectedListView'
import TodoAppView from './views/TodoAppView'
import ViewWrapper from './components/ViewWrapper'

storiesOf('Examples', module)
  .add('Basic', () => <ViewWrapper renderView={() => new BasicView()} />)
  .add('Simple List', () => <ViewWrapper renderView={() => new ListView()} />)
  .add('Connected Simple List', () => <ViewWrapper renderView={() => new ConnectedListView()} />)
  .add('Connected Todo App', () => <ViewWrapper renderView={() => new TodoAppView()} />)
