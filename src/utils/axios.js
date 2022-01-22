import axios from 'axios';
import Config from 'react-native-config';
import { userLogout } from '../redux/actions/authAction';
let store;

console.log(Config.API_URL);

export const injectStore = (_store) => {
  store = _store;
};

// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create({
  baseURL: Config.API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return { ...response, ...response.data };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // UNAUTHORIZATION
    if (error.response.status === 401) {
      store.dispatch(userLogout());
    }

    return Promise.reject(error.response.data);
  },
);

export default instance;
