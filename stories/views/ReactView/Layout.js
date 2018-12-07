import Marionette from 'backbone.marionette'
import ComponentView from './ComponentView'

const Layout = Marionette.Layout.extend({
  template() {
    return `
    <div>
      <h2>Layout containing a ComponentView</h2>
      <div class="js-region"></div>
      <label for="name">Name:</label>
      <input id="name" type="text"/>
      <button class="js-update-name">Update Name</button>
    </div>
    `
  },
  regions: {
    main: '.js-region',
  },
  ui: {
    input: 'input',
    button: '.js-update-name',
  },
  events: {
    'click @ui.button': 'updateName',
  },
  initialize() {
    this.listenTo(this.model, 'change', () => this.childView.render())
  },
  onShow() {
    this.childView = new ComponentView({ model: this.model })
    this.main.show(this.childView)
  },
  updateName() {
    const name = this.ui.input.val()
    this.model.set({ name })
  },
})

export default Layout
