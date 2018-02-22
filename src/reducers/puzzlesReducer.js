export const puzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PUZZLES':
      return action.puzzles;
    default:
      return state;
  }
};