import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import IBoard from "../../../../common/interfaces/IBoard";
import ICard from "../../../../common/interfaces/ICard";
import { validateTitle } from "../../../../common/utils/validate";
import { thunkEditCard } from "../../../../store/modules/board/actions";
import './card.scss'

// interface Props {
//     title: string;
//     position: string;
//     id: string;
//     listId: string;
//     boardId: string;
// };

export default function Card({ title, id, listId, boardId }: ICard) {
    const [editModeOn, setEditMode] = useState(false);
    const [editCardTitle, setCardTitle] = useState('');
    const [editCardValid, setEditCardValid] = useState(true);

    const dispatch = useDispatch();
    type AppDispatch = typeof dispatch;
    const useAppDispatch: () => AppDispatch = useDispatch;
    const appDispatch: ThunkDispatch<IBoard, void, Action> = useAppDispatch();

    const editOn = () => {
        setEditMode(true);
        setCardTitle(title);

    }
    const editOff = () => {
        setEditMode(false);
        appDispatch(thunkEditCard(boardId, id, listId, editCardTitle, editCardValid));
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            editOff();

        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCardTitle(e.target.value);
        setEditCardValid(validateTitle(e.target.value));
    }

    return (<div className="card">
        {!editModeOn && <h3 className="card__title" onClick={editOn}>{title}</h3>}
        {editModeOn && <input autoFocus className="card__title card__input" value={editCardTitle}
            type="text"
            onChange={handleChange} onBlur={editOff} onKeyDown={handleKeyDown} />}
    </div>)
}

