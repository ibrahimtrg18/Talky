import Config from 'react-native-config';
import axios from '../utils/axios';

class APIClient {
  constructor(
    resource,
    options = {
      access_token: '',
    },
  ) {
    this._baseURL = Config.API_URL;
    this._resource = resource;
    this._options = options;
  }

  get getBaseURL() {
    return this._baseURL;
  }

  get getResource() {
    return this._resource;
  }

  getAll() {
    return axios.get(this._resource, {
      headers: { Authorization: 'Bearer ' + this._options.access_token },
    });
  }

  getOne(id = '') {
    return axios.get(`${this._resource}/${id}`, {
      headers: { Authorization: 'Bearer ' + this._options.access_token },
    });
  }

  create(data = null) {
    return axios.post(this._resource, data, {
      headers: { Authorization: 'Bearer ' + this._options.access_token },
    });
  }

  update(id = '', data = null) {
    return axios.patch(`${this._resource}/${id}`, data, {
      headers: { Authorization: 'Bearer ' + this._options.access_token },
    });
  }

  remove(id = '') {
    return axios.patch(`${this._resource}/${id}`, {
      headers: { Authorization: 'Bearer ' + this._options.access_token },
    });
  }
}

export default APIClient;
