import TaskSpec from '../../../utils/TaskSpec'
import {faker} from '@helpscout/helix'
import makeListModel from '../../../utils/makeListModel'

export const START_LOADING = 'START_LOADING'
export const STOP_LOADING = 'STOP_LOADING'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_TODOS = 'SET_TODOS'
export const SET_META = 'SET_META'

// Reference the external callbacks provided from `extraArguments`
export const addTodo = todo => ({
  type: ADD_TODO,
  todo: {...todo, id: faker.random.uuid()()},
})
export const removeTodo = id => ({
  type: REMOVE_TODO,
  id,
})

export const reset = () => dispatch => {
  dispatch({type: START_LOADING})
  setTimeout(() => {
    dispatch({type: SET_TODOS, todos: TaskSpec.generate(2, 5)})
    dispatch({type: SET_META, meta: makeListModel()})
    dispatch({type: STOP_LOADING})
  }, 1000)
}
