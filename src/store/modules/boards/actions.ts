// import api from '/src/api';
import config from '../../../common/constants/api';
import {Dispatch} from "redux";
import api from "../../../api";
import { AxiosResponse } from 'axios';

export const getBoards = () => async (dispatch: Dispatch) => {
    try {
        let res: AxiosResponse & {accessToken: string} = await api.post('/login', {
            email: "test@gmail.com", password: "testpass"
        });
        api.interceptors.request.use(function (config) {
            const token = res.accessToken;
            if (config.headers) config.headers.Authorization =  token;
        
            return config;
        });
        console.log(res.accessToken);
        const data = await api.get("/board");
        dispatch({type: 'UPDATE_BOARDS', payload: data});
    } catch (e) {
        console.log(e)
        dispatch({type: 'ERROR_ACTION_TYPE'});
    }
}


