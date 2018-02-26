export const errorReducer = (state = null, action) => {
  switch (action.type) {
    case 'HAS_ERRORED':
      return action.message;
    default:
      return state;
  }
};