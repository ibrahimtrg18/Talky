import axios from '../../utils/axios';
import { storeData, getData, clearData } from '../../utils/storage';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const GET_ALL_FRIEND = 'GET_ALL_FRIEND';
export const GET_FRIEND = 'GET_FRIEND';
export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

export const fetchFriends = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const friends = await axios.get('/users/friend', {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FETCH_FRIENDS, payload: friends.data });
  } catch (e) {
    console.error(e);
  }
};
