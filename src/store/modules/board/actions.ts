// import api from '/src/api';
// import config from '/src/common/constants/api';
import {Dispatch} from "redux";
import api from "../../../api";

export const createBoard = () => async (dispatch: Dispatch) => {
    try {
        const data = await api.post("/board/board_id", {payload: ""});
        await dispatch({type: 'CREATE_BOARD', payload: data});
    } catch (e) {
        console.log(e)
        dispatch({type: 'ERROR_ACTION_TYPE'});
    }
}
