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
instance.interceptors.request.use(function (config) {
  if (config.url?.includes('login')) return config;
  const token = store.getState().common.common.token;
  // console.log(token);
  
        if (config.headers) config.headers.Authorization =  'Bearer ' + token;
    
        return config;
    }, () => {
      console.log('error');
      
});
    
instance.interceptors.response.use((res) => {
  
  return res.data;
});

export default instance;