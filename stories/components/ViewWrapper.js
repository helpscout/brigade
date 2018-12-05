import React, { PureComponent } from 'react'
import Marionette from 'backbone.marionette'
import PropTypes from 'prop-types'

class ViewWrapper extends PureComponent {
  componentDidMount() {
    this.showView()
  }

  render() {
    return <div id="region" />
  }

  showView() {
    const region = new Marionette.Region({ el: '#region' })
    region.show(this.props.renderView())
  }
}

ViewWrapper.propTypes = {
  renderView: PropTypes.func.isRequired,
}

export default ViewWrapper
