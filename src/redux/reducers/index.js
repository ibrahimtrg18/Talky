// libraries
import { combineReducers } from 'redux';
// reducers
import userReducer from './userReducer';
import authReducer from './authReducer';
import conversationReducer from './conversationReducer';
// import friendReducer from './friendReducer';

export default combineReducers({
  user: userReducer,
  auth: authReducer,
  conversation: conversationReducer,
  // friend: friendReducer,
});
