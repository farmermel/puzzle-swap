import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { locationReducer } from './locationReducer';
import { puzzlesReducer } from './puzzlesReducer';
// import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
  user: usersReducer,
  location: locationReducer,
  puzzles: puzzlesReducer
});

export default rootReducer;