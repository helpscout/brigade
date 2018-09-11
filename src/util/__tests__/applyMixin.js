import {applyMixin} from '..'
import Backbone from 'backbone'

describe('applyMixins', () => {
  test('should call the function to blend the mixin and view', () => {
    const View = Backbone.View.extend({})
    const mixin = {components: []}
    const blend = jest.fn()
    applyMixin(View, mixin, blend)
    expect(blend).toHaveBeenCalled()
    expect(blend.mock.calls[0][0]).toEqual(View)
    expect(blend.mock.calls[0][1]).toEqual(mixin)
  })

  test('should mixin to the view', () => {
    const View = Backbone.View.extend({})
    const mixin = {components: []}
    expect(View.prototype.components).toBeUndefined()

    applyMixin(View, mixin)
    expect(View.prototype.components).toBeDefined()
    expect(View.prototype.components).toEqual([])
  })
})
