export const loginReducer = (state = false, action) => {
  switch(action.type) {
    case 'SET_LOGIN':
      return action.loggedIn;
    default:
      return state;
  }
}