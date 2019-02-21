import React from 'react'
import ReactView from '../ReactView'
import {Provider} from 'react-redux'
import Marionette from 'backbone.marionette'

const StatefulReactView = (View = Marionette.ItemView) => {
  const RV = ReactView(View)
  return RV.extend({
    initialize({store}) {
      View.prototype.initialize.apply(this, arguments)
      this.__store = store
    },

    render() {
      this._ensureElement()
      this._triggerBeforeRendered()
      const isRerender = !!this._component
      this._component = (
        <Provider store={this.__store}>{this.template()}</Provider>
      )
      if (isRerender) {
        // If we are re-rendering, we want to call ReactDOM.render() to refresh
        this.renderComponent()
      }
      this._triggerRendered()
    },
  })
}

export default StatefulReactView
