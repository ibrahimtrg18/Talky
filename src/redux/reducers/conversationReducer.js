import _ from 'lodash';
import {
  FETCH_CONVERSATION,
  FETCH_CONVERSATION_CHAT,
  ADD_CONVERSATION_CHAT,
} from '../actions';

const INITIAL_STATE = {
  users: {},
  chats: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONVERSATION:
      return { ...state, users: { ..._.mapKeys(action.payload.users, 'id') } };
    case FETCH_CONVERSATION_CHAT:
      return { ...state, chats: { ..._.mapKeys(action.payload.chats, 'id') } };
    case ADD_CONVERSATION_CHAT:
      return {
        ...state,
        // using conversation inverted
        chats: { [action.payload.id]: action.payload, ...state.chats },
      };
    default:
      return state;
  }
};
