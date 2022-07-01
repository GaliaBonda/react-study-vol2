import React, { ChangeEvent, useState } from "react";
import { setSyntheticLeadingComments } from "typescript";
import ICard from "../../../../common/interfaces/ICard";
import Card from "../Card/Card";
import './list.scss'

type propsType = {
    title: string;
    cards: ICard[];
    handleChange: (title: string) => void
};
export default function List(props: propsType) {
    const [editModeOn, setEditMode] = useState(false);
    let cards = props.cards.map((item, index) => {
        return <Card title={item.title} key={index}/>
    });
    let editOn = () => {
        setEditMode(true);
    }
    let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.handleChange(e.target.value);
    }
    return (<li className="list">
        {!editModeOn && <h2 className="list__title" onClick={editOn}>{props.title}</h2>}
        {editModeOn && <input className="list__title" type="text" value={props.title} onChange={handleChange} />}
        <ul className="list__list">{cards}</ul>
        <button className="list__btn">+</button>
    </li>)
  }
  
  