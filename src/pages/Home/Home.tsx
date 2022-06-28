import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { validateLocaleAndSetLanguage } from "typescript";
import IBoard from "../../common/interfaces/IBoard";
import { getBoards, postBoard } from "../../store/modules/boards/actions";
import AddModal from "./components/AddModal/AddModal";
import Board from "./components/Board/Board";
import './home.scss';

type propsType = {
  boards: IBoard[];
  getBoards: () => Promise<void>;
  postBoard: (title: string) => Promise<void>;

}

// type stateType = {
//     boards: IBoard[];
// };
type stateType = {
  boards: IBoard[];
  addModalShown: boolean;
  newBoardTitle: string;
  newBoardIsValide: boolean;
};

// let testboards = [
//   { id: 1, title: "покупки" },
//   { id: 2, title: "подготовка к свадьбе" },
//   { id: 3, title: "разработка интернет-магазина" },
//   { id: 4, title: "курс по продвижению в соцсетях" }
// ];


class Home extends React.Component<propsType, stateType> {
    constructor(props: propsType) {
        super(props);
      this.state = {
        boards: this.props.boards,
        addModalShown: false,
        newBoardTitle: '',
        newBoardIsValide: false,
      };
      this.addBoard = this.addBoard.bind(this);
      this.closeAddModal = this.closeAddModal.bind(this);
      this.addNewBoard = this.addNewBoard.bind(this);
      this.updateNewBoardName = this.updateNewBoardName.bind(this);
      this.validateBoard = this.validateBoard.bind(this);
  }
  
  addBoard() {
      this.setState({addModalShown: true});
    
  }
  updateNewBoardName(name: string) {
    this.setState({ newBoardTitle: name });
    this.validateBoard(name);

  }

  validateBoard(title: string): void {
  
  const validationRegex = /^[a-z0-9а-я\s._-]+$/i;
  // if (title && title.length > 0 && validationRegex.test(title)) {
  if (title && title.length > 0 && validationRegex.test(title)) {
    this.setState({newBoardIsValide: true});
  } else {
    this.setState({newBoardIsValide: false});
  }
  }

  
  async addNewBoard() {
    this.setState({addModalShown: false});
      await this.props.postBoard(this.state.newBoardTitle);
    await this.props.getBoards();
    
    
  }
  closeAddModal() {
    this.setState({addModalShown: false});
    
  }

  async componentDidMount() {
    await this.props.getBoards();
    // await this.props.postBoard();
  }
  render() {
    let boards =  this.props.boards.map((item, index) => {
        return (
            <Link className="home__board-link"
            to={`/board/${item.id}`}
            key={index}
          >
            <Board title={item.title} />
          </Link>
        
        );
    });
    // console.log(this.props.boards);
    
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
        <button className="btn home__btn" onClick={this.addBoard}>Add board</button>
        <AddModal title="Add new board" isValide={this.state.newBoardIsValide} shown={this.state.addModalShown} 
        handleClose={this.closeAddModal}
        handleChange={this.updateNewBoardName} 
        handleOk={this.addNewBoard} />
            
        </div>
    );
  }
}

const mapStateToProps = (state: stateType) => ({
  ...state.boards,
});
export default connect(mapStateToProps, { getBoards, postBoard })(Home);
