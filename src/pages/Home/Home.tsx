import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import IBoard from "../../common/interfaces/IBoard";
import { validateTitle } from "../../common/utils/functions";
import { autorize, getBoards, postBoard } from "../../store/modules/boards/actions";
import AddModal from "../../components/AddModal/AddModal";
import Board from "./components/Board/Board";
import './home.scss';

type propsType = {
  boards?: IBoard[];
  getBoards: () => Promise<void>;
  postBoard: (title: string) => Promise<void>;
  autorize: () => Promise<void>;

}

// type stateType = {
//     boards: IBoard[];
// };
type stateType = {
  boards?: IBoard[];
  addModalShown: boolean;
  newBoardTitle: string;
  newBoardIsValide: boolean;
  autorizated: boolean;
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
        boards: [],
        addModalShown: false,
        newBoardTitle: '',
        newBoardIsValide: false,
        autorizated: false,
      };
      this.addBoard = this.addBoard.bind(this);
      this.closeAddModal = this.closeAddModal.bind(this);
      this.addNewBoard = this.addNewBoard.bind(this);
      this.updateNewBoardName = this.updateNewBoardName.bind(this);
      this.autorize = this.autorize.bind(this);
  }
   componentDidMount() {
     this.props.getBoards();
    // if (this.state.autorizated) {
    //   await this.props.getBoards();
    // }
    
  }
  addBoard() {
      this.setState({addModalShown: true});
    
  }
  updateNewBoardName(name: string) {
    this.setState({ newBoardTitle: name });
    this.setState({newBoardIsValide: validateTitle(name)});

  }

  
  async addNewBoard() {
    this.setState({addModalShown: false});
    await this.props.postBoard(this.state.newBoardTitle);
    await this.props.getBoards();
    
    
  }
  closeAddModal() {
    this.setState({addModalShown: false});
    
  }

  async autorize() {
    this.setState({autorizated: true});
    await this.props.autorize();
    await this.props.getBoards();
  }

  
  render() {
    if (!this.props.boards) return null;
    let boards =  this.props.boards.map((item, index) => {
        return (
            <Link className="home__board-link"
            to={`/board/${item.id}`}
            key={item.id}
          >
            <Board title={item.title} />
          </Link>
        
        );
    });
    
    return (
        <div className="home">
            <button className="btn home__btn autorization-btn" onClick={this.autorize}>Test Autorization</button>
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
export default connect(mapStateToProps, { getBoards, postBoard, autorize })(Home);
