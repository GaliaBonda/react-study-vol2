import React from "react";
import './card.scss'

type PropsType = {
    title: string;
};
export default function Card(props: PropsType) {
    return (<div className="card">
        <h3 className="card__title">{props.title}</h3>
    </div>)
  }
  
  