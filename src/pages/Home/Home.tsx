import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import IBoard from "../../common/interfaces/IBoard";
import { validateTitle } from "../../common/utils/validate";
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

interface State {
  boards: IBoard[];
  addModalShown: boolean;
  newBoardTitle: string;
  newBoardIsValide: boolean;
};

function Home({ boards, getBoards, postBoard }: Props) {
  // const { boards, getBoards, postBoard } = props;
  const [addModalShown, setAddModalShown] = useState(false);
  const [newBoardTitle, setNewBoardTItle] = useState('');
  const [newBoardValide, setNewBoardValide] = useState(false);


  useEffect(() => {
    getBoards()
  }, []);

  const addBoard = () => {
    setAddModalShown(true);

  }
  const updateNewBoardName = (name: string) => {
    setNewBoardTItle(name);
    setNewBoardValide(validateTitle(name));

  }


  const addNewBoard = async () => {
    setAddModalShown(false);
    await postBoard(newBoardTitle);
    await getBoards();


  }
  const closeAddModal = () => {
    setAddModalShown(false);
  }

  return (<div className="home">
    {/* <button className="btn home__btn autorization-btn" onClick={this.autorize}>Test Autorization</button> */}
    {/* {this.props.progressBar && <ProgressBar title="Boards processing..."/>}     */}
    <ProgressBar title="Boards processing..." />
    <ul className="home__list boards">
      {boards?.map((item, index) => {
        return (
          <Link className="home__board-link"
            to={`/board/${item.id}`}
            key={item.id}
          >
            <Board title={item.title} />
          </Link>

        );
      })}
    </ul>
    <button className="btn home__btn" onClick={addBoard}>Add board</button>
    <AddModal title="Add new board" isValide={newBoardValide} shown={addModalShown}
      handleClose={closeAddModal}
      handleChange={updateNewBoardName}
      handleOk={addNewBoard} />
  </div>);
}

const mapStateToProps = (state: State) => {
  return { boards: [...state.boards] }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any> & Dispatch) => {
  return {
    getBoards: () => dispatch(thunkGetBoards()),
    postBoard: (title: string) => dispatch(thunkPostBoard(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
