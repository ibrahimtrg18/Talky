import _ from 'lodash';
import { FETCH_CONVERSATION } from '../actions/conversation';

const INITIAL_STATE = {
  conversation: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONVERSATION:
      return { ...state, conversation: action.payload };
    default:
      return state;
  }
};
