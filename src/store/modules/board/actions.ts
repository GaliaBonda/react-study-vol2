// import api from '/src/api';
// import config from '/src/common/constants/api';
import { AxiosResponse } from "axios";
import {Dispatch} from "redux";
import api from "../../../api";
import IBoard from "../../../common/interfaces/IBoard";

export const getBoard = (id: string) => async (dispatch: Dispatch) => {
    try {
        let res: AxiosResponse & {accessToken: string, refreshToken: string} = await api.post('/login', {
            email: "test@gmail.com", password: "testpass"
        });
        console.log(res);
        await api.post('/refresh', {refreshToken: res.refreshToken}) 
        api.interceptors.request.use(function (config) {
            const token = res.accessToken;
            if (config.headers) config.headers.Authorization =  'Bearer ' + token;
        
            return config;
        });
        // console.log(res.accessToken);
        const data: {board: IBoard} = await api.get(`/board/${id}`);
        dispatch({type: 'GET_BOARD', payload: data.board});
    } catch (e) {
        console.log(e)
        dispatch({type: 'ERROR_ACTION_TYPE'});
    }
}

export const createBoard = () => async (dispatch: Dispatch) => {
    try {
        const data = await api.post("/board/board_id", {payload: ""});
        await dispatch({type: 'CREATE_BOARD', payload: data});
    } catch (e) {
        console.log(e)
        dispatch({type: 'ERROR_ACTION_TYPE'});
    }
}
