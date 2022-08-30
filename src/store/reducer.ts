import { combineReducers } from 'redux';
import boardReducer from './modules/board/reducer';
import boardsReducer from './modules/boards/reducer';
import userReducer from './modules/user/reducer';
import progressReducer from './modules/progress/reducer';
import errorReducer from './modules//error/reducer';

export default combineReducers({
    board: boardReducer,
    boards: boardsReducer,
    user: userReducer,
    progress: progressReducer,
    error: errorReducer,
});
