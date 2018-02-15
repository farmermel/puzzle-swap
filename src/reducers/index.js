import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { locationReducer } from './locationReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  location: locationReducer,
  loggedIn: loginReducer
});

export default rootReducer;