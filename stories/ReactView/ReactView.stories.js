import React from 'react'
import Backbone from 'backbone'
import {storiesOf} from '@storybook/react'
import ViewWrapper from '../common/components/ViewWrapper'
import ComponentView from './views/ComponentView'
import Layout from './views/Layout'
import Marionette from 'backbone.marionette'
import CompositeView from './views/CompositeView'
import TaskSpec from '../utils/TaskSpec'
import {makeListModel} from './views/TodoAppView'
import TodoAppView from './views/TodoAppView'

const stories = storiesOf('ReactView', module)

stories.add('Simple', () => {
  const model = new Backbone.Model({name: 'Jeff'})
  return <ViewWrapper renderView={() => new ComponentView({model})} />
})

stories.add('Layout', () => {
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
    itemView: ComponentView,
  })
  return <ViewWrapper renderView={() => new CollectionView({collection})} />
})

stories.add('CompositeView', () => {
  const collection = new Backbone.Collection([
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Steve'},
    {id: 3, name: 'Rick'},
  ])
  return <ViewWrapper renderView={() => new CompositeView({collection})} />
})

stories.add('ToDo App', () => {
  const model = new Backbone.Model(makeListModel())
  const collection = new Backbone.Collection(TaskSpec.generate(3))
  return <ViewWrapper renderView={() => new TodoAppView({model, collection})} />
})
