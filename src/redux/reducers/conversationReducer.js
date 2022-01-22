import _ from 'lodash';
import {
  FETCH_CONVERSATION,
  FETCH_CONVERSATION_CHAT,
  ADD_CONVERSATION_CHAT,
} from '../actions';

const INITIAL_STATE = {
  chat: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONVERSATION:
      return { ...state, ...action.payload };
    case FETCH_CONVERSATION_CHAT:
      return { ...state, chat: { ..._.mapKeys(action.payload.chats, 'id') } };
    case ADD_CONVERSATION_CHAT:
      return {
        ...state,
        // using conversation inverted
        chat: { [action.payload.id]: action.payload, ...state.chat },
      };
    default:
      return state;
  }
};
