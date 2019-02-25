import React from 'react'
import {storiesOf} from '@storybook/react'
import BasicView from './views/BasicView'
import ListView from './views/ListView'
import ConnectedListView from './views/ConnectedListView'
import TodoAppView from './views/TodoAppView'
import ViewWrapper from '../common/components/ViewWrapper'

storiesOf('ReactMounter (deprectated)', module)
  .add('basic', () => <ViewWrapper renderView={() => new BasicView()} />)
  .add('with state', () => <ViewWrapper renderView={() => new ListView()} />)
  .add('with store', () => (
    <ViewWrapper renderView={() => new ConnectedListView()} />
  ))
  .add('with store using connect', () => (
    <ViewWrapper renderView={() => new TodoAppView()} />
  ))
