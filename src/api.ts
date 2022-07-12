import axios from 'axios';
import { api } from './common/constants';
import store from './store/store';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer 123',
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
instance.interceptors.response.use((res) => {
  return res.data;
});

export default instance;