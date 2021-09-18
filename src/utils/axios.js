import axios from 'axios';
import { userLogout } from '../redux/actions/auth';
import { store } from '../redux/store';

// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create({
  baseURL: 'http://192.168.100.229:3000/api',
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

    return Promise.reject(error);
  },
);

export default instance;
