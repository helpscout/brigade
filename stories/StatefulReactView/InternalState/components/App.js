import React, {PureComponent} from 'react'
import Page from '@helpscout/hsds-react/components/Page'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import {connect} from 'react-redux'
import Header from './Header'

class App extends PureComponent {
  render() {
    return (
      <Page>
        <Page.Card>
          <Page.Header
            render={({Title, Subtitle}) => (
              <Header Title={Title} Subtitle={Subtitle} />
            )}
          />
          <Page.Content>
            <TodoForm />
            <TodoList />
          </Page.Content>
        </Page.Card>
      </Page>
    )
  }
}

const mapStateToProps = ({meta, isLoading}) => ({meta, isLoading})

export default connect(mapStateToProps)(App)
