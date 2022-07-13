// import api from '/src/api';
// import config from '/src/common/constants/api';
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import api from "../../../api";
import IBoard from "../../../common/interfaces/IBoard";

export const getBoard = (id: string) => async (dispatch: Dispatch) => {
  try {
  //   let res: AxiosResponse & {accessToken: string} = await api.post('/login', {
  //     email: "test@gmail.com", password: "testpass"
  // });
  // api.interceptors.request.use(function (config) {
  //     const token = res.accessToken;
  //     if (config.headers) config.headers.Authorization =  'Bearer ' + token;
  
  //     return config;
  // });
    const data: { board: IBoard } = await api.get(`/board/${id}`);
    dispatch({ type: 'GET_BOARD', payload: { ...data, id: id } });
  } catch (e) {
    console.log(e)
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}

export const editBoard = (id: string, name: string) => async (dispatch: Dispatch) => {
  try {
    await api.put(`/board/${id}`, { title: name });
    // console.log(data);

    await dispatch({ type: 'EDIT_BOARD', payload: { id: id, title: name } });
  } catch (e) {
    console.log(e)
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}

export const postList =
  (id: string, title: string, position: string) =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
        // let res: AxiosResponse & { accessToken: string } = await api.post('/login', {
        //   email: "test@gmail.com", password: "testpass"
        // });
        // api.interceptors.request.use(function (config) {
        //   const token = res.accessToken;
        //   if (config.headers) config.headers.Authorization = 'Bearer ' + token;

        //   return config;
        // });
        const list = {
          title: title,
          position: position,
        };

        await api.post(`/board/${id}/list`, list);
        // await api.delete(`/board/${id}/list/${1656600851486}`);
        await dispatch({ type: 'POST_LIST', payload: { ...list } });
      } catch (e) {
        console.error(e);
        dispatch({ type: 'ERROR_ACTION_TYPE' });
      }
    };
export const editList =
  (boardId: string, listId: string, title: string, position: string) =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
        // let res: AxiosResponse & { accessToken: string } = await api.post('/login', {
        //   email: "test@gmail.com", password: "testpass"
        // });
        // api.interceptors.request.use(function (config) {
        //   const token = res.accessToken;
        //   if (config.headers) config.headers.Authorization = 'Bearer ' + token;

        //   return config;
        // });
        const list = {
          title: title,
          position: position,
        };

        await api.put(`/board/${boardId}/list/${listId}`, list);
        // // await api.delete(`/board/${id}/list/${1656600851486}`);
        await dispatch({ type: 'EDIT_LIST', payload: { ...list } });
      } catch (e) {
        console.error(e);
        dispatch({ type: 'ERROR_ACTION_TYPE' });
      }
    };

    export const postCard =
  (id: string, listId: string, title: string, position: string) =>
  async (dispatch: Dispatch): Promise<void> => {
      try {
        // let res: AxiosResponse & {accessToken: string} = await api.post('/login', {
        //     email: "test@gmail.com", password: "testpass"
        // });
        // api.interceptors.request.use(function (config) {
        //     const token = res.accessToken;
        //     if (config.headers) config.headers.Authorization =  'Bearer ' + token;
        
        //     return config;
        // });
        const card = {
          title: title,
          position: position,
          list_id: listId,
        };

        let data: { result: string, id: number } = await api.post(`/board/${id}/card`, card);
        // await api.delete(`/board/${id}/card/${1657089868822}`);
        // await api.delete(`/board/${id}/card/${1657089237229}`);
        // await api.delete(`/board/${id}/card/${1657089259814}`);
        // await api.delete(`/board/${id}/card/${1657093858780}`);
        
        
        await dispatch({ type: 'POST_CARD', payload: { ...card, id: data.id.toString()} });
    } catch (e) {
    console.error(e);
      dispatch({ type: 'ERROR_ACTION_TYPE'});
    }
  };
    export const editCard =
  (id: string, cardId: string, listId: string, title: string) =>
  async (dispatch: Dispatch): Promise<void> => {
      try {
        // let res: AxiosResponse & {accessToken: string} = await api.post('/login', {
        //     email: "test@gmail.com", password: "testpass"
        // });
        // api.interceptors.request.use(function (config) {
        //     const token = res.accessToken;
        //     if (config.headers) config.headers.Authorization =  'Bearer ' + token;
        
        //     return config;
        // });
        // console.log('boardid:' + id, 'cardid:' + cardId, title, 'listid:' + listId);
        
      const card = {
        title: title,
        list_id: Number.parseInt(listId),
        };
//         {
//   title: "to pet a cat",
//   list_id: 1
// }



        await api.put(`/board/${id}/card/${cardId}`, card);
        ///board/<id>/card/<id>

    
    await dispatch({ type: 'EDIT_CARD', payload: { ...card, id: cardId} });
    } catch (e) {
console.error(e);
      dispatch({ type: 'ERROR_ACTION_TYPE'});
    }
  };


