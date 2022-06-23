import React from "react";
import ICard from "../../../../common/interfaces/ICard";
import Card from "../Card/Card";
import './list.scss'

type propsType = {
    title: string;
    cards: ICard[];
};
export default function List(props: propsType) {
    let cards = props.cards.map((item, index) => {
        return <Card title={item.title} key={index}/>
    });
    return (<li className="list">
        <h2 className="list__title">{props.title}</h2>
        <ul className="list__list">{cards}</ul>
        <button className="btn list__btn">+</button>
    </li>)
  }
  
  