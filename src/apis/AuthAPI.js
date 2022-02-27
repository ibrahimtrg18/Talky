import Axios from 'axios';
import Config from 'react-native-config';

export const USER_AVATAR_IMAGE = `${Config.API_URL}/user/account/avatar`;

const axios = Axios.create({
  baseURL: Config.API_URL,
});

axios.interceptors.response.use(
  function (response) {
    return { ...response, ...response.data };
  },
  function (error) {
    return Promise.reject(error.response.data);
  },
);

class Auth {
  static googleLogin(data) {
    return axios.post('/user/google/login', data);
  }

  static accountLogin(data) {
    return axios.post('/user/login', data);
  }
}

export default Auth;
