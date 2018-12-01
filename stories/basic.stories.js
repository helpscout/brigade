import React from 'react'
import {storiesOf} from '@storybook/react'
import AppWrapper from './components/AppWrapper'
import {
  BasicView,
  ConnectedModelCollectionView,
  ModelCollectionView
} from './views/basicViews'

storiesOf('Basic', module)
  .add('Basic', () => <AppWrapper View={BasicView} />)
  .add('Basic Model & Collection', () => (
    <AppWrapper View={ModelCollectionView} />
  ))
  .add('Connected Model & Collection', () => (
    <AppWrapper View={ConnectedModelCollectionView} />
  ))
