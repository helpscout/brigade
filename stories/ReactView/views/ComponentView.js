import React from 'react'
import Marionette from 'backbone.marionette'
import HeaderComponent from './HeaderComponent'
import {ReactView} from '../../../src'

const ComponentView = ReactView(
  Marionette.ItemView.extend({
    template(props) {
      return <HeaderComponent {...props} />
    },
  }),
)

export default ComponentView
