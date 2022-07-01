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
        // console.log(res);
        // await api.post('/refresh', {refreshToken: res.refreshToken}) 
        api.interceptors.request.use(function (config) {
            const token = res.accessToken;
            if (config.headers) config.headers.Authorization =  'Bearer ' + token;
        
            return config;
        });
        const data: { board: IBoard } = await api.get(`/board/${id}`);
        // console.log(data);
        
        dispatch({type: 'GET_BOARD', payload: {...data, id: id}});
    } catch (e) {
        console.log(e)
        dispatch({type: 'ERROR_ACTION_TYPE'});
    }
}

export const editBoard = (id: string, name: string) => async (dispatch: Dispatch) => {
    try {
        const data = await api.put(`/board/${id}`, {title: name});
        // console.log(data);
        
await dispatch({type: 'EDIT_BOARD', payload: {id: id, title: name}});
    } catch (e) {
        console.log(e)
dispatch({type: 'ERROR_ACTION_TYPE'});
    }
}

export const postList =
  (id: string, title: string, position: string) =>
  async (dispatch: Dispatch): Promise<void> => {
      try {
        let res: AxiosResponse & {accessToken: string} = await api.post('/login', {
            email: "test@gmail.com", password: "testpass"
        });
        api.interceptors.request.use(function (config) {
            const token = res.accessToken;
            if (config.headers) config.headers.Authorization =  'Bearer ' + token;
        
            return config;
        });
      const list = {
        title: title,
        position: position,
      };

    await api.post(`/board/${id}/list`, list);
    // await api.delete(`/board/${id}/list/${1656600851486}`);
    await dispatch({ type: 'POST_LIST', payload: { ...list} });
    } catch (e) {
console.error(e);
      dispatch({ type: 'ERROR_ACTION_TYPE'});
    }
  };
export const editList =
  (boardId: string, listId: string, title: string, position: string) =>
  async (dispatch: Dispatch): Promise<void> => {
      try {
        let res: AxiosResponse & {accessToken: string} = await api.post('/login', {
            email: "test@gmail.com", password: "testpass"
        });
        api.interceptors.request.use(function (config) {
            const token = res.accessToken;
            if (config.headers) config.headers.Authorization =  'Bearer ' + token;
        
            return config;
        });
      const list = {
        title: title,
        position: position,
      };

    await api.post(`/board/${boardId}/list/${listId}`, list);
    // // await api.delete(`/board/${id}/list/${1656600851486}`);
    await dispatch({ type: 'EDIT_LIST', payload: { ...list} });
    } catch (e) {
console.error(e);
      dispatch({ type: 'ERROR_ACTION_TYPE'});
    }
  };

  



// export const createBoard = () => async (dispatch: Dispatch) => {
//     try {
//         const data = await api.post("/board/board_id", {payload: ""});
//         await dispatch({type: 'CREATE_BOARD', payload: data});
//     } catch (e) {
//         console.log(e)
//         dispatch({type: 'ERROR_ACTION_TYPE'});
//     }
// }
