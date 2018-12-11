import {unmountComponentAtNode} from 'react-dom'
import {buildComponents} from './util'
import {result} from '../../util'

export default View =>
  View.extend({
    initialize() {
      View.prototype.initialize.apply(this, arguments)
      this.on('render', this.renderComponents, this)
      this.on('close', this.tearDownComponents, this)
    },

    renderComponents() {
      if (!this.components) {
        return
      }

      this.tearDownComponents()
      const components = result(this, 'components')
      this._components = buildComponents(this, components)
    },

    tearDownComponents() {
      if (!this._components) {
        return
      }

      this._components.forEach(el => {
        unmountComponentAtNode(el)
      })

      delete this._components
    },
  })
