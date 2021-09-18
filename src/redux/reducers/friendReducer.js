import _ from 'lodash';
import {
  FETCH_FRIENDS,
  GET_ALL_FRIEND,
  GET_FRIEND,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from '../actions/friend';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FRIENDS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
