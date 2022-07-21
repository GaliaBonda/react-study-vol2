import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import IBoard from "../../common/interfaces/IBoard";
import { validateTitle } from "../../common/utils/functions";
import { thunkGetBoards, thunkPostBoard } from "../../store/modules/boards/actions";
import AddModal from "../../components/AddModal/AddModal";
import Board from "./components/Board/Board";
import './home.scss';
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";

interface Props {
  boards?: IBoard[];
  getBoards: () => Promise<void>;
  postBoard: (title: string) => Promise<void>;

}

// type stateType = {
//     boards: IBoard[];
// };
interface State {
  boards?: IBoard[];
  addModalShown: boolean;
  newBoardTitle: string;
  newBoardIsValide: boolean;
};

// function Home (props: Props) {

//   return (<div className="home">
//   {/* <button className="btn home__btn autorization-btn" onClick={this.autorize}>Test Autorization</button> */}
//   {/* {this.props.progressBar && <ProgressBar title="Boards processing..."/>}     */}
//   <ProgressBar title="Boards processing..." />
//   <ul className="home__list boards">
//     {boards}
//   </ul>
//   <button className="btn home__btn" onClick={this.addBoard}>Add board</button>
//   <AddModal title="Add new board" isValide={this.state.newBoardIsValide} shown={this.state.addModalShown}
//     handleClose={this.closeAddModal}
//     handleChange={this.updateNewBoardName}
//     handleOk={this.addNewBoard} />
// </div>);
// }

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      boards: [],
      addModalShown: false,
      newBoardTitle: '',
      newBoardIsValide: false,
    };
    this.addBoard = this.addBoard.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.addNewBoard = this.addNewBoard.bind(this);
    this.updateNewBoardName = this.updateNewBoardName.bind(this);
  }
  async componentDidMount() {
    // await this.props.autorize();
    await this.props.getBoards();
    // }

  }
  addBoard() {
    this.setState({ addModalShown: true });

  }
  updateNewBoardName(name: string) {
    this.setState({ newBoardTitle: name });
    this.setState({ newBoardIsValide: validateTitle(name) });

  }


  async addNewBoard() {
    this.setState({ addModalShown: false });
    await this.props.postBoard(this.state.newBoardTitle);
    await this.props.getBoards();


  }
  closeAddModal() {
    this.setState({ addModalShown: false });

  }

  // async autorize() {
  //   this.setState({autorizated: true});
  //   await this.props.autorize();
  //   await this.props.getBoards();
  // }


  render() {
    if (!this.props.boards) return null;
    let boards = this.props.boards.map((item, index) => {
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
        {/* <button className="btn home__btn autorization-btn" onClick={this.autorize}>Test Autorization</button> */}
        {/* {this.props.progressBar && <ProgressBar title="Boards processing..."/>}     */}
        <ProgressBar title="Boards processing..." />
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

const mapStateToProps = (state: State) => ({
  ...state.boards,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any> & Dispatch) => {
  return {
    getBoards: () => dispatch(thunkGetBoards()),
    postBoard: (title: string) => dispatch(thunkPostBoard(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
