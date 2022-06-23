// import api from '/src/api';
// import config from '/src/common/constants/api';
import {Dispatch} from "redux";
import api from "../../../api";

export const getUser = () => async (dispatch: Dispatch) => {
    try {
        const data = await api.get("/user");
        await dispatch({type: 'UPDATE_USER', payload: data});
    } catch (e) {
        console.log(e)
        dispatch({type: 'ERROR_ACTION_TYPE'});
    }
}
