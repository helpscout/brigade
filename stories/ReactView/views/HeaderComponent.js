import React from 'react'
import {Component} from 'react'

class HeaderComponent extends Component {
  constructor() {
    super()
    this.state = {counter: 0}
    this.updateCounter = this.updateCounter.bind(this)
  }
  render() {
    return (
      <div className="react-header">
        <h1>Hello, {this.props.name}!</h1>
        <h2>Counter: {this.state.counter}</h2>
        <button onClick={this.updateCounter}>Update Counter</button>
      </div>
    )
  }
  updateCounter() {
    let {counter} = this.state
    counter++
    this.setState({counter})
  }
}

export default HeaderComponent
