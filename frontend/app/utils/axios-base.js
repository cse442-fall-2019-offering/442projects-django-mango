import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOST,
  headers: {},
});

instance.interceptors.request.use(
  // eslint-disable-next-line func-names
  function(config) {
    const token = localStorage.getItem('token');
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? `Token ${token}` : '';
    return config;
  },
  // eslint-disable-next-line func-names
  function(error) {
    return Promise.reject(error);
  },
);

export default instance;
