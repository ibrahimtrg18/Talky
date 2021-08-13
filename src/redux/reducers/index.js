// libraries
import { combineReducers } from 'redux';
// reducers
import userReducer from './userReducer';

export default combineReducers({
  user: userReducer,
});
