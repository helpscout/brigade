import React, {PureComponent} from 'react'
import Page from '@helpscout/hsds-react/components/Page'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

class App extends PureComponent {
  render() {
    return (
      <Page>
        <Page.Card>
          <Page.Header title="Todo List" />
          <Page.Content>
            <TodoForm />
            <TodoList />
          </Page.Content>
        </Page.Card>
      </Page>
    )
  }
}

export default App
