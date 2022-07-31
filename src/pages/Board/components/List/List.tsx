import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import IBoard from "../../../../common/interfaces/IBoard";
import ICard from "../../../../common/interfaces/ICard";
import IList from "../../../../common/interfaces/IList";
import { validateTitle } from "../../../../common/utils/validate";
import AddModal from "../../../../components/AddModal/AddModal";
import { thunkEditList, thunkPostCard } from "../../../../store/modules/board/actions";
import Card from "../Card/Card";
import './list.scss'

// interface Props {
//     title: string;
//     cards: ICard[];
//     position: string;
//     id: string;
//     boardId: string;
// };

export default function List({ title, cards, position, id, boardId }: IList) {
    const [editModeOn, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [titleValid, setTitleValid] = useState(true);
    const [addCardModalShown, setModalShown] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [newCardValid, setNewCardValid] = useState(false);

    const dispatch = useDispatch();
    type AppDispatch = typeof dispatch;
    const useAppDispatch: () => AppDispatch = useDispatch;
    const appDispatch: ThunkDispatch<IBoard, void, Action> = useAppDispatch();

    const editOn = () => {
        setEditMode(true);
        setInputValue(title);
    }
    const editOff = () => {
        setEditMode(false);
        setTitleValid(validateTitle(inputValue));
        appDispatch(thunkEditList(boardId, id, inputValue, position, titleValid));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            editOff();
        }
    }

    const updateNewCardName = (title: string) => {
        setNewCardTitle(title);
        setNewCardValid(validateTitle(title));
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    const handleClick = () => {
        setModalShown(true);
    }
    const closeAddModal = () => {
        setModalShown(false);
    }
    const handleOk = () => {
        setModalShown(false);
        appDispatch(thunkPostCard(boardId, id, newCardTitle, newCardValid, (cards.length + 1).toString()));
    }


    return (<li className="list">
        {!editModeOn && <h2 className="list__title" onClick={editOn}>{title}</h2>}
        {editModeOn && <input autoFocus className="list__title list__input" type="text" value={inputValue}
            onBlur={editOff} onKeyDown={handleKeyDown}
            onChange={handleChange} />}
        <ul className="list__list">
            {cards.map((item) => {
                return <Card title={item.title} key={item.id} position={item.position} id={item.id}
                    listId={id} boardId={boardId} />
            })}
        </ul>
        <button className="list__btn" onClick={handleClick}>+</button>
        <AddModal title="Add new card" shown={addCardModalShown} isValide={newCardValid}
            handleClose={closeAddModal}
            handleChange={updateNewCardName}
            handleOk={handleOk} />
    </li>)
}
