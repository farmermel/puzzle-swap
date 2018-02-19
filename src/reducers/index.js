import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { locationReducer } from './locationReducer';
import { puzzlesReducer } from './puzzlesReducer';
import { usersChatsReducer } from './usersChatsReducer';

const rootReducer = combineReducers({
  user: usersReducer,
  location: locationReducer,
  puzzles: puzzlesReducer,
  usersChats: usersChatsReducer
});

export default rootReducer;