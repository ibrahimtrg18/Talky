import axios from '../../utils/axios';
import { storeData, getData, clearData } from '../../utils/storage';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const GET_ALL_FRIEND = 'GET_ALL_FRIEND';
export const GET_FRIEND = 'GET_FRIEND';
export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const SEARCH_USER = 'SEARCH_USER';

export const fetchProfile = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const user = await axios.get('/users/account', {
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
    const users = await axios.get(`/users/search?q=${query}`, {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: SEARCH_USER, payload: users.data });
  } catch (e) {
    console.error(e);
  }
};
