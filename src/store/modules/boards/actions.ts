// import api from '/src/api';
import config from '../../../common/constants/api';
import {Dispatch} from "redux";
import api from "../../../api";
import { AxiosResponse } from 'axios';
import IBoard from '../../../common/interfaces/IBoard';

export const getBoards = () => async (dispatch: Dispatch) => {
    try {
        let res: AxiosResponse & {accessToken: string} = await api.post('/login', {
            email: "test@gmail.com", password: "testpass"
        });
        api.interceptors.request.use(function (config) {
            const token = res.accessToken;
            if (config.headers) config.headers.Authorization =  'Bearer ' + token;
        
            return config;
        });
        // console.log(res.accessToken);
        const data: {boards: IBoard[]} = await api.get("/board");
        dispatch({type: 'UPDATE_BOARDS', payload: data.boards});
    } catch (e) {
        console.log(e)
        dispatch({type: 'ERROR_ACTION_TYPE'});
    }
}


