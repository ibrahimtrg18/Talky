import _ from 'lodash';
import { FETCH_PROFILE, SEARCH_USER } from '../actions/user';

const INITIAL_STATE = {
  profile: null,
  search: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return { ...state, profile: action.payload };
    case SEARCH_USER:
      return { ...state, search: { ..._.mapKeys(action.payload, 'id') } };
    default:
      return state;
  }
};
