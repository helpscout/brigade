import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import ComponentView from './ComponentView'

const CompositeView = Marionette.CompositeView.extend({
  itemView: ComponentView,
  itemViewContainer: '.js-container',
  template() {
    return `
    <div>
      <h2>CompositeView containing an array of ComponentViews</h2>
      <ul class="js-container"></ul>
      <label for="name">Name:</label>
      <input id="name" type="text"/>
      <button class="js-add-button">Add Model</button>
    </div>
    `
  },
  regions: {
    main: '.js-region',
  },
  ui: {
    input: 'input',
    button: '.js-add-button',
  },
  events: {
    'click @ui.button': 'addModel',
  },
  addModel() {
    const name = this.ui.input.val()
    const model = new Backbone.Model({ name })
    this.collection.add(model)
  },
})

export default CompositeView
