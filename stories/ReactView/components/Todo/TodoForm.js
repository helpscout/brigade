import PropTypes from 'prop-types'
import React, {Component} from 'react'
import Input from '@helpscout/hsds-react/components/Input'

class TodoForm extends Component {
  static propTypes = {
    addTodo: PropTypes.func,
  }

  static defaultProps = {
    addTodo: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {task: ''}
  }

  handleChange = task => {
    this.setState({
      task,
    })
  }

  handleSubmit = e => {
    e && e.preventDefault()

    const {task} = this.state
    this.props.addTodo({task})

    this.setState({
      task: '',
    })
  }

  render() {
    const {task: value} = this.state

    return (
      <form onSubmit={this.handleSubmit} style={{marginBottom: '10px'}}>
        <Input
          onChange={this.handleChange}
          placeholder="Enter a task"
          value={value}
        />
      </form>
    )
  }
}

export default TodoForm
