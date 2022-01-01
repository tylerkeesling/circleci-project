import axios from 'axios';

const instance = axios.create({
  baseURL: `https://${process.env.VUE_APP_OKTA_DOMAIN}`,
  timeout: 1000,
  headers: {
    Authorization: `SSWS ${process.env.VUE_APP_OKTA_API_KEY}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
