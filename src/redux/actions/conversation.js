import axios from '../../utils/axios';

const FETCH_CONVERSATION = 'FETCH_CONVERSATION';

export const fetchConversationById = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const conversation = await axios.get(`/conversation/${id}`, {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FETCH_CONVERSATION, payload: conversation });
  } catch (e) {
    console.error(e);
  }
};
