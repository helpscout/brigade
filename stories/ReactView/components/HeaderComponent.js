import React, {Component} from 'react'
import {Flexy, Page, Button} from '@helpscout/hsds-react/components'

class HeaderComponent extends Component {
  constructor() {
    super()
    this.state = {counter: 0}
    this.updateCounter = this.updateCounter.bind(this)
  }
  render() {
    const {updateCounter} = this
    const {name} = this.props
    const {counter} = this.state
    return (
      <Page>
        <Page.Card>
          <Page.Header render={({Title}) => <Title>Hello, {name}!</Title>} />
          <Page.Content>
            <Flexy>
              <Flexy.Item>Internal State Counter: {counter}</Flexy.Item>
              <Flexy.Item>
                <Button onClick={updateCounter}>Increment</Button>
              </Flexy.Item>
            </Flexy>
          </Page.Content>
        </Page.Card>
      </Page>
    )
  }
  updateCounter() {
    let {counter} = this.state
    counter++
    this.setState({counter})
  }
}

export default HeaderComponent
