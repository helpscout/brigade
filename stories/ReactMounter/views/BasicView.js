import Marionette from 'backbone.marionette'
import React from 'react'
import {ReactMounter} from '../../../src'

import Basic from '../components/Basic'
import template from '../templates/template'

const BasicView = ReactMounter(
  Marionette.ItemView.extend({
    components: {
      '#page': <Basic />,
    },

    template,
  }),
)

export default BasicView
