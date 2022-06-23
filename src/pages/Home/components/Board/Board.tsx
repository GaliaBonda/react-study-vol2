import React from 'react';
import './board.scss';

type propsType = {
    title: string;
};

export default function Board(props: propsType) {
    return (<li className="home__board board-head">
        <h2 className="board-head__title">{props.title}</h2>
    </li>);
}