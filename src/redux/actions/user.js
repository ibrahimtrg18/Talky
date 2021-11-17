import axios from '../../utils/axios';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const GET_ALL_FRIEND = 'GET_ALL_FRIEND';
export const GET_FRIEND = 'GET_FRIEND';
export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const FIND_USER = 'FIND_USER';
export const FETCH_USER_FRIENDS = 'FETCH_USER_FRIENDS';
export const FETCH_USER_CONVERSATIONS = 'FETCH_USER_CONVERSATIONS';
export const REGISTER_USER = 'REGISTER_USER';

export const registerUser = (payload) => async (dispatch, getState) => {
  try {
    const res = await axios.post('/user/register', payload);
    dispatch({ type: REGISTER_USER, payload: res.data.access_token });
  } catch (e) {
    console.error(e);
  }
};

export const fetchAccount = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.get('/user/account', {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FETCH_PROFILE, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};

export const updateAccount = (payload) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.patch('/user/account', payload, {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FETCH_PROFILE, payload: res.data });
    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const searchUser = (query) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.get(`/user/search?q=${query}`, {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FIND_USER, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};

export const fetchUserFriends = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.get('/user/friend', {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FETCH_USER_FRIENDS, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};

export const fetchUserConversations = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.get('/user/conversation', {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FETCH_USER_CONVERSATIONS, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};
