import axios from 'axios';
import { api } from '../common/constants';

// let token;

// const config = {
//   headers: { Authorization: `Bearer ${token}` }
// };

// const bodyParameters = {
//  key: "value"
// };

// axios.post( 
// 'http://localhost:8000/api/v1/get_token_payloads',
// bodyParameters,
// config
// ).then(console.log).catch(console.log);

// let token;

// token = await api.post(`/board`, board);

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`,
  },
});

// let token: string;

// async function getToken() {
//   let res = await instance.post('/user', {"email": "test@gmail.com", "password": "testpass"});
//   console.log(res);
  
//   return res;
// } 



// instance.interceptors.request.use(
//   async config => {
//     let token = await getToken();
//     if(config.headers) config.headers['Authorization'] = `Bearer ${token}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

instance.interceptors.response.use((res) => res.data);

export default instance;