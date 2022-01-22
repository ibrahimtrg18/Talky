import ConversationAPI from '../../apis/ConversationAPI';

export const FETCH_CONVERSATION = 'FETCH_CONVERSATION';
export const FETCH_CONVERSATION_CHAT = 'FETCH_CONVERSATION_CHAT';
export const ADD_CONVERSATION_CHAT = 'ADD_CONVERSATION_CHAT';

export const fetchConversationById = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const conversationAPI = new ConversationAPI(auth.access_token);
    const conversation = await conversationAPI.getOne(id);
    dispatch({ type: FETCH_CONVERSATION, payload: conversation.data });
  } catch (e) {
    console.error(e);
  }
};

export const fetchConversationChatById = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const conversationAPI = new ConversationAPI(auth.access_token);
    const conversation = await conversationAPI.getOneChat(id);
    dispatch({
      type: FETCH_CONVERSATION_CHAT,
      payload: conversation.data,
    });
  } catch (e) {
    console.error(e);
  }
};

export const addConversationChat = (chat) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CONVERSATION_CHAT,
      payload: chat,
    });
  } catch (e) {
    console.error(e);
  }
};
