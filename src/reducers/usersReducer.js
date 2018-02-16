export const usersReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      // const nextState = {...state}
      // nextState[action.user.name] = action.user;
      return action.user
    default:
      return state
  }
}