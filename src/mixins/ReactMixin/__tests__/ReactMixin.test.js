import {ReactMixin} from '..'
import React from 'react'
import Backbone from 'backbone'
import Cocktail from 'backbone.cocktail'
import $ from 'jquery'
import reactDom from 'react-dom'

describe('ReactMixin', () => {
  const documentBody = "<div id='app'></div>"

  const DummyComponent = ({text, ...rest}) => (
    <div className="dummy-component" {...rest}>
      Was passed in text: {text}
    </div>
  )

  const ReactView = Backbone.View.extend({
    components: {
      '#region1': () => <DummyComponent text="Text 1" id="text1" />,
      '#region2': () => ({
        component: <DummyComponent id="text2" />,
        data: {text: 'Text 2'},
      }),
    },
    element: $('#app'),
    template: `
      <div>
        <div id="region1"></div>
        <div id="region2"></div>
      </div>
    `,
    close() {
      this.trigger('close')
      return this
    },
    render() {
      this.$el.html(this.template)
      this.trigger('render')
      return this
    },
  })

  Cocktail.mixin(ReactView, ReactMixin)

  test("should invoke 'renderComponents' when the view is rendered", done => {
    const mixin = {
      ...ReactMixin,
      renderComponents: jest.fn(),
    }
    const View = Backbone.View.extend({})
    Cocktail.mixin(View, mixin)
    const view = new View({})
    view.trigger('render')
    setTimeout(() => {
      expect(mixin.renderComponents).toHaveBeenCalled()
      done()
    }, 1)
  })

  test("should invoke 'tearDownComponents' when the view is closed", done => {
    const mixin = {
      ...ReactMixin,
      tearDownComponents: jest.fn(),
    }
    const View = Backbone.View.extend({})
    Cocktail.mixin(View, mixin)
    const view = new View()
    view.trigger('close')
    setTimeout(() => {
      expect(mixin.tearDownComponents).toHaveBeenCalled()
      done()
    }, 1)
  })

  test('should mount React components when the view is rendered', done => {
    document.body.innerHTML = documentBody
    const view = new ReactView({})
    view.render()
    setTimeout(() => {
      expect(view.$el.find('.dummy-component')).toHaveLength(2)

      const text1 = view.$el.find('#text1')
      expect(text1).toHaveLength(1)
      expect(text1.text()).toEqual('Was passed in text: Text 1')

      const text2 = view.$el.find('#text2')
      expect(text2).toHaveLength(1)
      expect(text2.text()).toEqual('Was passed in text: Text 2')

      done()
    }, 1)
  })

  test('should unmount React components when closed', done => {
    reactDom.unmountComponentAtNode = jest.fn()
    document.body.innerHTML = documentBody
    const view = new ReactView({})
    view.render()
    setTimeout(() => {
      view.close()
      setTimeout(() => {
        expect(reactDom.unmountComponentAtNode).toHaveBeenCalledTimes(2)
        done()
      }, 1)
    }, 1)
  })
})
