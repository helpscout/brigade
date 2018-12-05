import React, { PureComponent } from 'react'
import $ from 'jquery'
import Marionette from 'backbone.marionette'
import PropTypes from 'prop-types'

class ViewWrapper extends PureComponent {
  componentDidMount() {
    this.showView()
  }

  render() {
    return <div id="region"/>
  }

  showView() {
    const region = new Marionette.Region({ el: $('#region') })
    const view = this.props.renderView()
    region.show(view)
  }
}

ViewWrapper.propTypes = {
  renderView: PropTypes.func.isRequired,
}

export default ViewWrapper
