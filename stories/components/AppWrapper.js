import React, { PureComponent } from 'react'
import Marionette from 'backbone.marionette'

class ViewWrapper extends PureComponent {
  componentDidMount() {
    this.buildApp().start()
  }

  render() {
    return <div id="app" />
  }

  buildApp() {
    const { View } = this.props
    const App = Marionette.Application.extend({
      region: '#app',
      onStart() {
        this.showView(new View())
      }
    })
    return new App()
  }
}

export default ViewWrapper