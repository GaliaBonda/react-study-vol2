import { Dispatch } from "redux";
import api from "../../../api";
import { AxiosResponse } from 'axios';
import IBoard from '../../../common/interfaces/IBoard';

export const thunkGetBoards = () => async (dispatch: Dispatch) => {
  try {
    const data: { boards: IBoard[] } = await api.get("/board");
    dispatch({ type: 'UPDATE_BOARDS', payload: data.boards });
  } catch (e) {
    console.log(e)
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}

export const thunkPostBoard = (title: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const board = {
      title: title,
    };

    await api.post(`/board`, board);
    await dispatch({ type: 'POST_BOARD', payload: { ...board } });
  } catch (e) {
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};

export const postBoard =
  (title: string) =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
        const board = {
          title: title,
        };

        await api.post(`/board`, board);
        await dispatch({ type: 'POST_BOARD', payload: { ...board } });
      } catch (e) {
        dispatch({ type: 'ERROR_ACTION_TYPE' });
      }
    };


