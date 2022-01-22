import { LOGIN, LOGOUT } from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
