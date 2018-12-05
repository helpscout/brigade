import React from 'react'
import Backbone from 'backbone'
import { storiesOf } from '@storybook/react'
import ViewWrapper from './ViewWrapper'
import ComponentView from './ComponentView'
import Layout from './Layout'
import Marionette from 'backbone.marionette'
import CompositeView from './CompositeView'

const stories = storiesOf('Common/ReactView', module)

stories.add('Simple', () => {
  const model = new Backbone.Model({ name: 'Jeff' })
  return <ViewWrapper renderView={() => new ComponentView({ model })} />
})

stories.add('Layout', () => {
  const model = new Backbone.Model({ name: 'Jeff' })
  return <ViewWrapper renderView={() => new Layout({ model })} />
})

stories.add('CollectionView', () => {
  const collection = new Backbone.Collection([
    { id: 1, name: 'Jeff' },
    { id: 2, name: 'Steve' },
    { id: 3, name: 'Rick' },
  ])
  const CollectionView = Marionette.CollectionView.extend({
    itemView: ComponentView,
  })
  return <ViewWrapper renderView={() => new CollectionView({ collection })} />
})

stories.add('CompositeView', () => {
  const collection = new Backbone.Collection([
    { id: 1, name: 'Jeff' },
    { id: 2, name: 'Steve' },
    { id: 3, name: 'Rick' },
  ])
  return <ViewWrapper renderView={() => new CompositeView({ collection })} />
})
