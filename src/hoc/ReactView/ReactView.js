import ReactDOM from 'react-dom'
import Marionette from 'backbone.marionette'

export const COMPONENT_UPDATED = 'component:updated'

const ReactView = View =>
  View.extend({
    initialize(...args) {
      if (!(this instanceof Marionette.ItemView)) {
        console.warn(
          'ReactView mixin is intended for use with ItemViews - behavior may not match expectations',
        )
      }
      View.prototype.initialize.apply(this, args)
      this.listenTo(this, 'close', this.teardownComponent)
    },

    render() {
      this._ensureElement()
      this._triggerBeforeRendered()
      const props = this.serializeData()
      const isRerender = !!this._component
      this._component = this.template(props)
      if (isRerender) {
        // If we are re-rendering, we want to call ReactDOM.render() to refresh
        this.renderComponent()
      }
      this._triggerRendered()
    },

    _triggerBeforeRendered() {
      this.triggerMethod('before:render', this)
      this.triggerMethod('item:before:render', this)
    },

    _triggerRendered() {
      this.triggerMethod('render', this)
      this.triggerMethod('item:rendered', this)
    },

    onShow(...args) {
      this.renderComponent()
      const {onShow} = View.prototype
      onShow && onShow.apply(this, ...args)
    },

    renderComponent() {
      ReactDOM.render(this._component, this.$el[0], () =>
        this.onComponentUpdated(),
      )
    },

    onComponentUpdated() {
      this.trigger(COMPONENT_UPDATED, this._component)
    },

    teardownComponent() {
      ReactDOM.unmountComponentAtNode(this.$el[0])
    },
  })

export default ReactView
