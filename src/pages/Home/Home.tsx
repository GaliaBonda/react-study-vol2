import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import IBoard from "../../common/interfaces/IBoard";
import { getBoards } from "../../store/modules/boards/actions";
import Board from "./components/Board/Board";
import './home.scss';

type propsType = {
  boards: IBoard[];
  getBoards: () => Promise<void>;
}

// type stateType = {
//     boards: IBoard[];
// };
type stateType = {
  boards: IBoard[]
};

class Home extends React.Component<propsType, stateType> {
    constructor(props: propsType) {
        super(props);
        // this.state = state;
    }

    async componentDidMount() {
      await this.props.getBoards();
    }
  render() {
    let boards =  this.props.boards.map((item, index) => {
        return (
            <Link className="home__board-link"
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

const mapStateToProps = (state: stateType) => ({
  ...state.boards,
});
export default connect(mapStateToProps, { getBoards })(Home);
