import axios, { AxiosResponse } from 'axios';
import { api } from './common/constants';
import store from './store/store';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.interceptors.request.use((config) => {
//   if (!config.url?.includes('login')) {
// store.dispatch({type: 'PROGRESS_BAR_ON'});
//   }


//   return config;
// });
// instance.interceptors.response.use((res) => {
//   store.dispatch({type: 'PROGRESS_BAR_OFF'});
//   return res.data;
// });
instance.interceptors.request.use(async function (config) {
  console.log('api interceptor');
  
  if (config.url?.includes('login')) return config;

  if (!store.getState().common.common.token.accestoken) {
    let res: AxiosResponse & { accessToken: string, refreshToken: string } = await instance.post('/login', {
      email: "test@gmail.com", password: "testpass"
    });
    store.dispatch({ type: 'AUTHORIZE', payload: { accestoken: res.accessToken, refreshtoken: res.refreshToken } });

  }
  const token = store.getState().common.common.token.accestoken;
  // console.log(token);

  if (config.headers) config.headers.Authorization = 'Bearer ' + token;

  return config;
}, () => {
  console.log('error');

});

instance.interceptors.response.use((res) => {

  return res.data;
}, async function (error) {

  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest.retry) {
    originalRequest.retry = true;

    const refreshedToken: AxiosResponse & { accessToken: string, refreshToken: string } = await instance.post('/refresh', {
      refreshToken: store.getState().common.common.token.refreshtoken,
    });
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + refreshedToken.accessToken;
    store.dispatch({
      type: 'AUTHORIZE', payload: {
        accestoken: refreshedToken.accessToken,
        refreshtoken: refreshedToken.refreshToken
      }
    });

    return instance(originalRequest);
  }
});

export default instance;