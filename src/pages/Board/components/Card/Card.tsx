import React from "react";
import './card.scss'

type propsType = {
    title: string;
};
export default function Card(props: propsType) {
    return (<div className="card">
        <h3 className="card__title">{props.title}</h3>
    </div>)
  }
  
  