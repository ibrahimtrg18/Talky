import _ from 'lodash';
import {
  FETCH_USER,
  FETCH_PROFILE,
  FIND_USER,
  FETCH_USER_FRIENDS,
  FETCH_USER_CONVERSATIONS,
} from '../actions';

const INITIAL_STATE = {
  user: null,
  account: null,
  search: {},
  friend: {},
  conversation: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload };
    case FETCH_PROFILE:
      return { ...state, account: action.payload };
    case FIND_USER:
      return { ...state, search: { ..._.mapKeys(action.payload, 'id') } };
    case FETCH_USER_FRIENDS:
      return { ...state, friend: { ..._.mapKeys(action.payload, 'id') } };
    case FETCH_USER_CONVERSATIONS: {
      return { ...state, conversation: { ..._.mapKeys(action.payload, 'id') } };
    }
    default:
      return state;
  }
};
