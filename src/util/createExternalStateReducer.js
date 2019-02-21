const createExternalStateReducer = (name, initialState = '') => {
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
export default createExternalStateReducer
