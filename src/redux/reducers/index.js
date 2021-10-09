// libraries
import { combineReducers } from 'redux';
// reducers
import userReducer from './userReducer';
import authReducer from './authReducer';
// import friendReducer from './friendReducer';

export default combineReducers({
  user: userReducer,
  auth: authReducer,
  // friend: friendReducer,
});
