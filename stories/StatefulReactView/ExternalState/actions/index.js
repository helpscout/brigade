export const START_LOADING = 'START_LOADING'
export const STOP_LOADING = 'STOP_LOADING'

// Reference the external callbacks provided from `extraArguments`
export const addTodo = (...args) => (dispatch, getState, {addTodo}) => {
  return addTodo(...args)
}

export const removeTodo = (...args) => (dispatch, getState, {removeTodo}) => {
  return removeTodo(...args)
}

export const reset = (...args) => (dispatch, getState, {reset}) => {
  dispatch({type: START_LOADING})
  return reset(...args).finally(() => dispatch({type: STOP_LOADING}))
}
