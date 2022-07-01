import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import ICard from "../../../../common/interfaces/ICard";
import { validateTitle } from "../../../../common/utils/functions";
import AddModal from "../../../../components/AddModal/AddModal";
import Card from "../Card/Card";
import './list.scss'

type propsType = {
    
    title: string;
    cards: ICard[];
    position: string;
    id: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    updateTitle: () => void;

    newCardIsValide: boolean;
    updateNewCardName: (value: string) => void;
    addNewCard: () => void;
};
export default function List(props: propsType) {
    const [editModeOn, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [addCardModalShown, setModalShown] = useState(false);
    // const [newCardTitle, setNewCardTitle] = useState('');
    // const [newCardIsValide, setCardValide] = useState(false);
    let cards = props.cards.map((item, index) => {
        return <Card title={item.title} key={index}/>
    });
    let editOn = () => {
        setEditMode(true);
        setInputValue(props.title);
    }
    let editOff = () => {
        setEditMode(false);
        props.updateTitle();
    }
    let handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            editOff();
            props.updateTitle();
        }
    }
    let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        props.handleChange(e);
    }
    let handleClick = () => {
        setModalShown(true);
    }
    let closeAddModal = () => {
        setModalShown(false);
    }
    let handleOk = () => {
        setModalShown(false);
        props.addNewCard();
    }
    // let updateNewCardName = (title: string) => {
    //     setNewCardTitle(title);
    //     setCardValide(validateTitle(title));
    // }
    // let addNewCard = () => {

    // }
    
    return (<li className="list">
        {!editModeOn && <h2 className="list__title" onClick={editOn}>{props.title}</h2>}
        {editModeOn && <input autoFocus className="list__title list__input" type="text" value={inputValue} 
        onBlur={editOff} onKeyDown={handleKeyDown}
        onChange={handleChange} />}
        <ul className="list__list">{cards}</ul>
        <button className="list__btn" onClick={handleClick}>+</button>
        <AddModal title="Add new card" shown={addCardModalShown} isValide={props.newCardIsValide}
                    handleClose={closeAddModal}
                    handleChange={props.updateNewCardName}
                    handleOk={handleOk} />
    </li>)
  }
  
  