import React from "react";
import List from "./components/List/List";
import './board.scss'
import { Link, Params } from "react-router-dom";
import { withRouter } from "../../common/utils/withRouter";
import { connect } from "react-redux";
import { getBoard } from "../../store/modules/board/actions";
import IBoard from "../../common/interfaces/IBoard";


type propsType = {
    title: string;
    lists: Array<any>;
    boardId: number | null;
    params: Readonly<Params<string>>;
    getBoard: (id: string | undefined) => Promise<void>;
};

type stateType = {board: IBoard};

// let boardId:string;

class Board extends React.Component<propsType, stateType> {
    constructor(props: propsType) {
        super(props);
        // this.state = state;
    }

    async componentDidMount() {
        let boardId = this.props.params.boardID;
        await this.props.getBoard(boardId);
    }

    render() {
        let lists = this.props.lists.map((item, index) => {
            return <List title={item.title} cards={item.cards} key={index}></List>
        });
        
        return (<div className="board">
            <Link className="board__link" to="/">Home</Link>
            <div className="board-container">
                <h1 className="board__title">{this.props.title} {this.props.boardId}!</h1>
                <ul className="board__list">{lists}</ul>
                <button className="board__btn btn">Add list</button>
            </div>


        </div>);
    }
}

// export default withRouter(Board);
const mapStateToProps = (state: stateType) => ({
    ...state.board,
  });
  export default connect(mapStateToProps, { getBoard })(withRouter(Board));