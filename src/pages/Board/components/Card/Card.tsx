import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import './card.scss'

type propsType = {
    title: string;
    handleCardChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editedCardTitle: string;
    updateCardTitle: () => void;
};

export default function Card(props: propsType) {
    const [editModeOn, setEditMode] = useState(false);
    const [editCardTitle, setCardTitle] = useState('');
    const editOn = () => {
        setEditMode(true);
        setCardTitle(props.title);
        
    }
    const editOff = () => {
        setEditMode(false);
        props.updateCardTitle();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            editOff();
            
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCardTitle(e.target.value);
        props.handleCardChange(e);
    }

    return (<div className="card">
        {!editModeOn && <h3 className="card__title" onClick={editOn}>{props.title}</h3>}
        {editModeOn && <input autoFocus className="card__title card__input" value={editCardTitle}
            type="text" 
        onChange={handleChange} onBlur={editOff} onKeyDown={handleKeyDown}/>}
    </div>)
  }
  
  