import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import Card from '@helpscout/hsds-react/components/Card'

import TodoListItem from './TodoListItem'

class TodoList extends PureComponent {
  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        task: PropTypes.string,
      }),
    ),
    removeTodo: PropTypes.func,
  }

  static defaultProps = {
    todos: [],
    removeTodo: () => {},
  }

  render() {
    const {todos, removeTodo} = this.props

    if (!todos.length) {
      return null
    }

    return (
      <Card seamless>
        {todos.map(todo => (
          <TodoListItem key={todo.id} todo={todo} removeTodo={removeTodo} />
        ))}
      </Card>
    )
  }
}

export default TodoList
