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

    renderComponent: function () {
      return <Provider store={ this.__store }>{ this.template() }</Provider>
    },

    render() {
      this._ensureElement()
      this._triggerBeforeRendered()
      const isRerender = !!this._component
      this._component = this.renderComponent()
      if (isRerender) {
        // If we are re-rendering, we want to call ReactDOM.render() to refresh
        this.mountComponent()
      }
      this._triggerRendered()
    },
  })
}

export default StatefulReactView
