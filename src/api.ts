import axios from 'axios';
import { api } from './common/constants';
import { history } from './common/utils/history';
import { showProgress } from './store/modules/progress/actions';
import store from './store/store';

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
      email: api.testEmail, password: api.testPassword,
    });
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  }
  config.headers = { "Authorization": 'Bearer ' + localStorage.getItem('accessToken') }
  // history.back();

  return config;
}, () => {
  console.error('error');

});

instance.interceptors.request.use(async function (config) {
  if (config.method !== 'get') return config;

  store.dispatch(showProgress(true));



  return config;
}, () => {
  console.error('error');

});

instance.interceptors.response.use((res) => {
  if (res.config.method !== 'get') return res;
  store.dispatch(showProgress(false));

  return res;
}, function (error) {
  return Promise.reject(error);

});

instance.interceptors.response.use((res) => {
  return res.data;
}, async function (error) {

  // const originalRequest = error.config;


  if (error.response.status === 401) {
    const oldRefreshToken = localStorage.getItem('refreshToken');
    if (oldRefreshToken) {
      try {
        const refreshedToken: { accessToken: string, refreshToken: string } = await instance.post('/refresh', {
          refreshToken: oldRefreshToken,
        });
        localStorage.setItem('accessToken', refreshedToken.accessToken);
        localStorage.setItem('refreshToken', refreshedToken.refreshToken);
        error.config.headers = {
          ...error.config.header,
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
        return instance.request(error.config);
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }

    }

    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + refreshedToken.accessToken;

  }
  return Promise.reject(error);
});



export default instance;