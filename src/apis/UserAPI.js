import API from './API';
import axios from '../utils/axios';

class UserAPI extends API {
  constructor(access_token) {
    super('/user');
    this._access_token = access_token;
  }

  account() {
    return axios.get(`${this.getResource}/account`, {
      headers: { Authorization: 'Bearer ' + this._access_token },
    });
  }

  updateAccount(data) {
    return axios.patch(`${this.getResource}/account`, data, {
      headers: { Authorization: 'Bearer ' + this._access_token },
    });
  }

  accountAvatar() {
    return `${this.getBaseURL}${this.getResource}/account/avatar`;
  }

  createAccountAvatar(data) {
    return axios.post('/user/account/avatar', data, {
      headers: {
        Authorization: 'Bearer ' + this._access_token,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  conversation() {
    return axios.get('/user/conversation', {
      headers: { Authorization: 'Bearer ' + this._access_token },
    });
  }

  friend() {
    return axios.get('/user/friend', {
      headers: { Authorization: 'Bearer ' + this._access_token },
    });
  }

  register(data) {
    return axios.post(`${this.getResource}/register`, data);
  }

  search({ q }) {
    return axios.get(`${this.getResource}/search?q=${q}`, {
      headers: { Authorization: 'Bearer ' + this._access_token },
    });
  }
}

export default UserAPI;
