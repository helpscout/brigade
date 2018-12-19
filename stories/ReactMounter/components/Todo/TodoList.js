import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import Card from '@helpscout/hsds-react/components/Card'
import {connect} from '../../../../src'

import TodoListItem from './TodoListItem'

class TodoList extends PureComponent {
  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        task: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    todos: [],
  }

  static displayName = 'TodoList'

  render() {
    const {todos} = this.props

    if (!todos.length) {
      return null
    }

    return (
      <Card seamless>
        {todos.map(todo => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </Card>
    )
  }
}

const mapStateToProps = ({todos}) => ({todos})

export default connect(mapStateToProps)(TodoList)
