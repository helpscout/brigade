import {ReactMounter} from '..'
import React from 'react'
import Backbone from 'backbone'
import $ from 'jquery'
import reactDom from 'react-dom'
import connect from '../../../components/connect'

describe('ReactMounter', () => {
  const documentBody = "<div id='app'></div>"

  const DummyComponent = ({text, ...rest}) => (
    <div className="dummy-component" {...rest}>
      Was passed in text: {text}
    </div>
  )

  const mapStateToProps = ({text}) => ({text})

  const ConnectedDummyComponent = connect(mapStateToProps)(DummyComponent)

  const View = Backbone.View.extend({
    components: {
      '#region1': () => <DummyComponent text="Text 1" id="text1" />,
      '#region2': () => ({
        component: <ConnectedDummyComponent id="text2" />,
        initialState: {text: 'Text 2'},
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

  const ReactView = ReactMounter(View)

  jest.useFakeTimers()

  test('_components should not be set if there are no components', () => {
    const ReactView = ReactMounter(Backbone.View)
    const view = new ReactView()
    view.renderComponents()
    expect(view._components).toBeUndefined()
  })

  test('should mount React components when the view is rendered', () => {
    document.body.innerHTML = documentBody
    const view = new ReactView({})
    view.render()
    jest.runAllTimers()
    expect(view.$el.find('.dummy-component')).toHaveLength(2)

    const text1 = view.$el.find('#text1')
    expect(text1).toHaveLength(1)
    expect(text1.text()).toEqual('Was passed in text: Text 1')

    const text2 = view.$el.find('#text2')
    expect(text2).toHaveLength(1)
    expect(text2.text()).toEqual('Was passed in text: Text 2')
  })

  test('should unmount React components when closed', () => {
    reactDom.unmountComponentAtNode = jest.fn()
    document.body.innerHTML = documentBody
    const view = new ReactView({})
    view.render()
    view.close()
    jest.runAllTimers()
    expect(reactDom.unmountComponentAtNode).toHaveBeenCalledTimes(2)
  })
})
