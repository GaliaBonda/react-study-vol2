import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import api from "../../../api";

export const autorize = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    let res: AxiosResponse & {accessToken: string} = await api.post('/login', {
        email: "test@gmail.com", password: "testpass"
    });
      dispatch({type: 'AUTHORIZE', payload: res.accessToken}); 
    // api.interceptors.request.use(function (config) {
    //     const token = res.accessToken;
    //     if (config.headers) config.headers.Authorization =  'Bearer ' + token;
    
    //     return config;
    // }, () => {
    //   console.log('error');
      
    // });
    
} catch (e) {
    console.log(e)
}
};