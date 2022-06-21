import React from "react";
import List from "./components/List/List";
import './board.scss'

type StateType = {
    title: string;
    lists: Array<any>;
};
let state = {
    title: "Моя тестовая доска",
    lists: [
        {
            id: 1,
            title: "Планы",
            cards: [
                { id: 1, title: "помыть кота" },
                { id: 2, title: "приготовить суп" },
                { id: 3, title: "сходить в магазин" }
            ]
        },
        {
            id: 2,
            title: "В процессе",
            cards: [
                { id: 4, title: "посмотреть сериал" }
            ]
        },
        {
            id: 3,
            title: "Сделано",
            cards: [
                { id: 5, title: "сделать домашку" },
                { id: 6, title: "погулять с собакой" }
            ]
        }
    ]
};

export default class Board extends React.Component<any, StateType> {
    constructor(props: any) {
        super(props);
        this.state = state;
    }

    render() { 
        let lists = this.state.lists.map((item, index) => {
           return <List title={item.title} cards={item.cards} key={index}></List>
        });
        return (<div className="board">
            <div className="board-container">
                <h1 className="board__title">{this.state.title}!</h1>
            <ul className="board__list">{lists}</ul>
            <button className="board__btn">+ list</button>
            </div>
            

        </div>);
    }
}
