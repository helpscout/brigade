import React, { Component } from 'react'
import Input from '@helpscout/hsds-react/components/Input'
import connect from '../../../src/components/connect'

class TodoForm extends Component {
  constructor(props) {
    super(props)

    this.state = { task: '' }
  }

  handleChange = task => {
    this.setState({
      task,
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()

    const { task } = this.state
    this.props.addTodo({ task })

    this.setState({
      task: '',
    })
  }

  render() {
    const { task: value } = this.state

    return (
      <form onSubmit={this.handleSubmit} style={{marginBottom: "10px"}}>
        <Input onChange={this.handleChange} value={value} />
      </form>
    )
  }
}

const actions = store => {
  const externalActions = store.getExternalActions()

  return {
    addTodo: (_state, todo) => externalActions.addTodo(todo)
  }
}

export default connect(null, actions)(TodoForm)
