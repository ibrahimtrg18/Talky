import _ from 'lodash';
import {
  FETCH_PROFILE,
  FIND_USER,
  FETCH_USER_FRIENDS,
  FETCH_USER_CONVERSATIONS,
} from '../actions/user';

const INITIAL_STATE = {
  account: null,
  search: {},
  friend: {},
  conversation: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
