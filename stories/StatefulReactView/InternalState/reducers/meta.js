import {SET_META} from '../actions'

const initialState = {}

const meta = (state = initialState, action) => {
  switch (action.type) {
    case SET_META:
      return action.meta
    default:
      return state
  }
}

export default meta
