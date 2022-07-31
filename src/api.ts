import axios, { AxiosResponse } from 'axios';
import { api } from './common/constants';
import store from './store/store';
import { history } from './common/utils/history';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(async function (config) {
  if (config.url?.includes('login')) return config;
  const token = localStorage.getItem('accessToken');
  if (!token) {
    // history.push('/auth');
    let res: { accessToken: string, refreshToken: string } = await instance.post('/login', {
      email: api.testEmail, password: api.testPassword
    });
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  }
  config.headers = { "Authorization": 'Bearer ' + token }

  return config;
}, () => {
  console.error('error');

});

instance.interceptors.response.use((res) => {
  return res.data;
}, async function (error) {

  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest.retry) {
    originalRequest.retry = true;

    const refreshedToken: { accessToken: string, refreshToken: string } = await instance.post('/refresh', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + refreshedToken.accessToken;
    return instance(originalRequest);
  }
});

export default instance;