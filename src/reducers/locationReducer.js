export const locationReducer = (state = 'all locations', action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return action.location;
    default:
      return state;
  }
};