/**
 * Create a reducer capable of being reset externally by dispatching the `reset` action
 * @param name
 * @param initialState
 * @return {{reducer: reducer, reset: (function(*): {type: string, state: *})}}
 */
export const createExternalReducer = (name, initialState = '') => {
  const actionType = `RESET_STATE_${name}`
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType:
        return action.state
      default:
        return state
    }
  }
  const reset = state => ({type: actionType, state})
  return {reducer, reset}
}

export default createExternalReducer
