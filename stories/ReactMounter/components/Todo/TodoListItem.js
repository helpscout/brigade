import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import Button from '@helpscout/hsds-react/components/Button'
import Card from '@helpscout/hsds-react/components/Card'
import Flexy from '@helpscout/hsds-react/components/Flexy'
import {connect} from '../../../../src'

class TodoListItem extends PureComponent {
  static propTypes = {
    removeTodo: PropTypes.func,
  }

  static defaultProps = {
    removeTodo: () => {},
  }

  static displayName = 'TodoListItem'

  render() {
    const {
      removeTodo,
      todo: {id, task},
      ...rest
    } = this.props

    return (
      <Card.Block {...rest}>
        <Flexy>
          <Flexy.Block>{task}</Flexy.Block>
          <Flexy.Item>
            <Button onClick={() => removeTodo(id)}>Remove</Button>
          </Flexy.Item>
        </Flexy>
      </Card.Block>
    )
  }
}

const mapActionsToProps = store => {
  const {removeTodo} = store.getStatelessExternalActions()
  return {removeTodo}
}

export default connect(
  null,
  mapActionsToProps,
)(TodoListItem)
