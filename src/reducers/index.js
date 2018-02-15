import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { locationReducer } from './locationReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  location: locationReducer
});

export default rootReducer;