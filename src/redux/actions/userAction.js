import UserAPI from '../../apis/UserAPI';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const GET_ALL_FRIEND = 'GET_ALL_FRIEND';
export const GET_FRIEND = 'GET_FRIEND';
export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const FIND_USER = 'FIND_USER';
export const FETCH_USER_FRIENDS = 'FETCH_USER_FRIENDS';
export const FETCH_USER_CONVERSATIONS = 'FETCH_USER_CONVERSATIONS';
export const REGISTER_USER = 'REGISTER_USER';
export const FETCH_USER = 'FETCH_USER';

export const registerUser = (payload) => async (dispatch, getState) => {
  try {
    const userAPI = new UserAPI();
    const res = await userAPI.register(payload);
    dispatch({ type: REGISTER_USER, payload: res.data.access_token });
  } catch (e) {
    console.error(e);
  }
};

export const fetchUser = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const userAPI = new UserAPI(auth.access_token);
    const res = await userAPI.getOne(id);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};

export const fetchAccount = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const userAPI = new UserAPI(auth.access_token);
    const res = await userAPI.account();
    dispatch({ type: FETCH_PROFILE, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};

export const updateAccount = (payload) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const userAPI = new UserAPI(auth.access_token);
    const res = await userAPI.updateAccount(payload);
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
    const userAPI = new UserAPI(auth.access_token);
    const res = await userAPI.search({ q: query });
    dispatch({ type: FIND_USER, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};

export const fetchUserFriends = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const userAPI = new UserAPI(auth.access_token);
    const res = await userAPI.friend();
    dispatch({ type: FETCH_USER_FRIENDS, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};

export const fetchUserConversations = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const userAPI = new UserAPI(auth.access_token);
    const res = await userAPI.conversation();
    dispatch({ type: FETCH_USER_CONVERSATIONS, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};

export const uploadUserAccountAvatar = (data) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const userAPI = new UserAPI(auth.access_token);
    const res = await userAPI.createAccountAvatar(data);
    dispatch({ type: FETCH_USER_CONVERSATIONS, payload: res.data });
  } catch (e) {
    console.error(e);
  }
};
