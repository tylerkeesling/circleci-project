import axios from 'axios';
import ls from 'local-storage';

const APPLICATION_JSON = 'application/json';

const defaultOptions = {
  baseURL: `${process.env.VUE_APP_RESOURCE_SERVER}`,
  timeout: 10000,
  headers: {
    Accept: APPLICATION_JSON,
    'Content-Type': APPLICATION_JSON,
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const token = ls.get('okta-token-storage')?.accessToken?.accessToken;
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
