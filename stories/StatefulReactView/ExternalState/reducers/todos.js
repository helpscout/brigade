import {ADD_TODO, REMOVE_TODO, SET_TODOS} from '../actions'

const initialState = []

const todos = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos
    case ADD_TODO:
      return [...state, action.todo]
    case REMOVE_TODO:
      return state.filter(task => task.id !== action.id)
    default:
      return state
  }
}

export default todos
