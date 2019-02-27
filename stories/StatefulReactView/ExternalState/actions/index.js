import { faker } from '@helpscout/helix'
import TaskSpec from '../../../utils/TaskSpec'

export const START_LOADING = 'START_LOADING'
export const STOP_LOADING = 'STOP_LOADING'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_TODOS = 'SET_TODOS'

export const addTodo = todo => ({
  type: ADD_TODO,
  todo: {...todo, id: faker.random.uuid()()},
})
export const removeTodo = id => ({
  type: REMOVE_TODO,
  id,
})

// Reference the external callback provided from `extraArguments`
export const reset = (...args) => (dispatch, getState, { refreshMeta }) => {
  dispatch({type: START_LOADING})
  return refreshMeta(...args)
    .then(() => dispatch({type: SET_TODOS, todos: TaskSpec.generate(2, 5)}))
    .finally(() => dispatch({type: STOP_LOADING}))
}

