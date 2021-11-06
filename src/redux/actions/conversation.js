import axios from '../../utils/axios';

export const FETCH_CONVERSATION = 'FETCH_CONVERSATION';
export const FETCH_CONVERSATION_CHAT = 'FETCH_CONVERSATION_CHAT';

export const fetchConversationById = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const conversation = await axios.get(`/conversation/${id}`, {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({ type: FETCH_CONVERSATION, payload: conversation.data });
  } catch (e) {
    console.error(e);
  }
};

export const fetchConversationChatById = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const conversation = await axios.get(`/conversation/${id}/chat`, {
      headers: { Authorization: 'Bearer ' + auth.access_token },
    });
    dispatch({
      type: FETCH_CONVERSATION_CHAT,
      payload: conversation.data,
    });
  } catch (e) {
    console.error(e);
  }
};
