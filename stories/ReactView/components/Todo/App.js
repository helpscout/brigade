import React, {PureComponent} from 'react'
import Page from '@helpscout/hsds-react/components/Page'
import Spinner from '@helpscout/hsds-react/components/Spinner'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

class App extends PureComponent {
  render() {
    const {listName, isLoading, reset, addTodo, removeTodo, todos} = this.props
    return (
      <Page>
        <Page.Card>
          <Page.Header
            render={({Title, Subtitle}) => (
              <div>
                <Title>{listName}</Title>
                <Subtitle>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <a href="javascript:void(0);" onClick={reset}>
                      Reset
                    </a>
                  )}
                </Subtitle>
              </div>
            )}
          />{' '}
          <Page.Content>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} removeTodo={removeTodo} />
          </Page.Content>
        </Page.Card>
      </Page>
    )
  }
}

export default App
