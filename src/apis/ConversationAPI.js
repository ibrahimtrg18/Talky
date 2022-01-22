import API from './API';
import axios from '../utils/axios';

class ConversationAPI extends API {
  constructor(access_token) {
    super('/conversation', { access_token: access_token });
    this._access_token = access_token;
  }

  getOneChat(id) {
    return axios.get(`${this.getResource}/${id}/chat`, {
      headers: { Authorization: 'Bearer ' + this._access_token },
    });
  }
}

export default ConversationAPI;
