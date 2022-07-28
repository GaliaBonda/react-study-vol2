import { AxiosResponse } from "axios";
import { AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import api from "../../../api";
import IBoard from "../../../common/interfaces/IBoard";

export const getBoard = (id: string) => async (dispatch: Dispatch) => {
  try {
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
        const list = {
          title: title,
          position: position,
        };

        await api.post(`/board/${id}/list`, list);
        await dispatch({ type: 'POST_LIST', payload: { ...list } });
      } catch (e) {
        console.error(e);
        dispatch({ type: 'ERROR_ACTION_TYPE' });
      }
    };

export const thunkEditList =
  (boardId: string, listId: string, title: string, position: string, valid: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
        if (!valid) return;
        const list = {
          title: title,
          position: position,
        };
        await api.put(`/board/${boardId}/list/${listId}`, list);
        await dispatch({ type: 'EDIT_LIST', payload: { ...list } });
      } catch (e) {
        console.error(e);
        dispatch({ type: 'ERROR_ACTION_TYPE' });
      }
    };
export const editList =
  (boardId: string, listId: string, title: string, position: string) =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
        const list = {
          title: title,
          position: position,
        };

        await api.put(`/board/${boardId}/list/${listId}`, list);
        await dispatch({ type: 'EDIT_LIST', payload: { ...list } });
      } catch (e) {
        console.error(e);
        dispatch({ type: 'ERROR_ACTION_TYPE' });
      }
    };

export const postCard =
  (id: string, listId: string, title: string, valid: boolean, position: string) =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
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


        await dispatch({ type: 'POST_CARD', payload: { ...card, id: data.id.toString() } });
      } catch (e) {
        console.error(e);
        dispatch({ type: 'ERROR_ACTION_TYPE' });
      }
    };

export const editCard =
  (id: string, cardId: string, listId: string, title: string) =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
        const card = {
          title: title,
          list_id: Number.parseInt(listId),
        };
        await api.put(`/board/${id}/card/${cardId}`, card);


        await dispatch({ type: 'EDIT_CARD', payload: { ...card, id: cardId } });
      } catch (e) {
        console.error(e);
        dispatch({ type: 'ERROR_ACTION_TYPE' });
      }
    };


