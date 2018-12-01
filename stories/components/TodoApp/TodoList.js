import React, { PureComponent } from 'react'
import Card from '@helpscout/hsds-react/components/Card'
import connect from '../../../src/components/connect'

class TodoList extends PureComponent {
  render() {
    const { todos } = this.props

    if (!todos.length) {
      return null
    }

    return (
      <Card seamless>
        {todos.map(({id, task}) => (
          <Card.Block key={id}>{task}</Card.Block>
        ))}
      </Card>
    )
  }
}

const mapStateToProps = ({ todos }) => ({ todos })

export default connect(mapStateToProps)(TodoList)
