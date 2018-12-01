import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Page from '@helpscout/hsds-react/components/Page'

import TodoForm from './TodoForm'
import TodoList from './TodoList'

class App extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    const { title } = this.props

    return (
      <Page>
        <Page.Header title={title} />
        <Page.Content>
          <TodoForm />
          <TodoList />
        </Page.Content>
      </Page>
    )
  }
}

export default App