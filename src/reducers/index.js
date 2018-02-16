import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { locationReducer } from './locationReducer';
// import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
  user: usersReducer,
  location: locationReducer
});

export default rootReducer;