import React from "react";
import List from "./components/List/List";
import './board.scss'
import { Link, useParams } from "react-router-dom";
import { withRouter } from "../../common/utils/withRouter";


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
let boardId:string;

class Board extends React.Component<any, StateType> {
    constructor(props: any) {
        super(props);
        this.state = state;
    }

    componentDidMount() {
        // let { board_id } = this.props.params;
        boardId = this.props.params.boardID;
        console.log(this.props.params);
        
        
        // if (board_id) {
        //     console.log(board_id);
        //     boardId = board_id;
        // }
    }

    render() {
        let lists = this.state.lists.map((item, index) => {
            return <List title={item.title} cards={item.cards} key={index}></List>
        });
        
        
        //  const { board_id } = useParams();

        return (<div className="board">
            <Link className="board__link" to="/">Home</Link>
            <div className="board-container">
                <h1 className="board__title">{this.state.title} {boardId}!</h1>
                <ul className="board__list">{lists}</ul>
                <button className="board__btn btn">Add list</button>
            </div>


        </div>);
    }
}

export default withRouter(Board);
