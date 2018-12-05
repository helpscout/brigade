import Marionette from 'backbone.marionette'
import React from 'react'
import brigade from '../../src'

import Basic from '../components/Basic'
import template from '../templates/template'

const BasicView = Marionette.ItemView.extend({
  components: {
    '#page': <Basic />,
  },

  template,
})

export default brigade(BasicView)
