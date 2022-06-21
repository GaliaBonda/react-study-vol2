import React from "react";
import ICard from "../../../../common/interfaces/ICard";
import Card from "../Card/Card";
import './list.scss'

type PropsType = {
    title: string;
    cards: ICard[];
};
export default function List(props: PropsType) {
    let cards = props.cards.map((item) => {
        return <Card title={item.title} />
    });
    return (<li className="list">
        <h2 className="list__title">{props.title}</h2>
        <ul className="list__list">{cards}</ul>
    </li>)
  }
  
  