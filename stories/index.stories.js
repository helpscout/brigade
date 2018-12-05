import React from 'react'
import { storiesOf } from '@storybook/react'

import AppWrapper from './components/AppWrapper'
import BasicView from './views/BasicView'
import ListView from './views/ListView'
import ConnectedListView from './views/ConnectedListView'
import TodoAppView from './views/TodoAppView'

storiesOf('Examples', module)
  .add('Basic', () => <AppWrapper View={BasicView} />)
  .add('Simple List', () => <AppWrapper View={ListView} />)
  .add('Connected Simple List', () => <AppWrapper View={ConnectedListView} />)
  .add('Connected Todo App', () => <AppWrapper View={TodoAppView} />)
