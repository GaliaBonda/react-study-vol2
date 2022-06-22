import React from 'react';
import './board.scss';

type PropsType = {
    title: string;
};

export default function Board(props: PropsType) {
    return (<li className="home__board board-head">
        <h2 className="board-head__title">{props.title}</h2>
    </li>);
}