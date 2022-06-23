import React from "react";
import { Link } from 'react-router-dom';
import IBoard from "../../common/interfaces/IBoard";
import Board from "./components/Board/Board";
import './home.scss';

type StateType = {
    boards: IBoard[];
};

let state = {
    boards: [
      {id: 1, title: "покупки"},
      {id: 2, title: "подготовка к свадьбе"},
      {id: 3, title: "разработка интернет-магазина"},
      {id: 4, title: "курс по продвижению в соцсетях"}
    ]
  };

export default class Home extends React.Component<any, StateType> {
    constructor(props: any) {
        super(props);
        this.state = state;
    }
  render() {
    let boards = this.state.boards.map((item, index) => {
        return (
            <Link
            to={`/board/${index}`}
            key={index}
          >
            <Board title={item.title} />
          </Link>
        
        );
    });
    return (
        <div className="home">
            <nav className="home__nav nav">
               <ul className="nav__list">
                <li className="nav__list-item">
                    <Link className="home__link" to="/board">Board</Link>
                </li>
            </ul> 
            </nav>
            <ul className="home__list boards">
                {boards}
            </ul>
            <button className="btn home__btn">Add board</button>
            
            
        </div>
    );
  }
}