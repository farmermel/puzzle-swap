export const usersReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_USER':
      const nextState = {...state}
      nextState[action.user.name] = action.user;
      return nextState
    default: 
      return state
  }
}