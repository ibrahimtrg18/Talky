import axios from '../../utils/axios';
import { storeData, getData, clearData } from '../../utils/storage';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const GET_ALL_FRIEND = 'GET_ALL_FRIEND';
export const GET_FRIEND = 'GET_FRIEND';
export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const FIND_USER = 'FIND_USER';
export const FETCH_USER_FRIENDS = 'FETCH_USER_FRIENDS';
export const REGISTER_USER = 'REGISTER_USER';

export const fetchProfile = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const user = await axios.get('/user/account', {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FETCH_PROFILE, payload: user.data });
  } catch (e) {
    console.error(e);
  }
};

export const searchUser = (query) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const users = await axios.get(`/user/search?q=${query}`, {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FIND_USER, payload: users.data });
  } catch (e) {
    console.error(e);
  }
};

export const fetchFriends = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const friends = await axios.get('/user/friend', {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FETCH_USER_FRIENDS, payload: friends.data });
  } catch (e) {
    console.error(e);
  }
};

export const registerUser = (payload) => async (dispatch, getState) => {
  try {
    const res = await axios.post('/user/register', payload);
    dispatch({ type: REGISTER_USER, payload: res.data.access_token });
  } catch (e) {
    console.error(e);
  }
};
