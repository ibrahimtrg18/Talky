import _ from 'lodash';
import {
  FETCH_CONVERSATION,
  FETCH_CONVERSATION_CHAT,
} from '../actions/conversation';

const INITIAL_STATE = {
  chat: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONVERSATION:
      return { ...state, ...action.payload };
    case FETCH_CONVERSATION_CHAT:
      return { ...state, chat: { ..._.mapKeys(action.payload.chats, 'id') } };
    default:
      return state;
  }
};
