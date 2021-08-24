// libraries
import { combineReducers } from 'redux';
// reducers
import userReducer from './userReducer';
import authReducer from './authReducer';

export default combineReducers({
  user: userReducer,
  auth: authReducer,
});
