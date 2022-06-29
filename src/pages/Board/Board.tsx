import React from "react";
import List from "./components/List/List";
import './board.scss'
import { Link, Params } from "react-router-dom";
import { withRouter } from "../../common/utils/withRouter";
import { connect } from "react-redux";
import { editBoard, getBoard } from "../../store/modules/board/actions";
import IBoard from "../../common/interfaces/IBoard";
import { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { validateBoard } from "../../common/utils/functions";


type propsType = {
    board: IBoard;
    // title: string;
    // lists: Array<any>;
    // id: number | null;
    params: Readonly<Params<string>>;
    getBoard: (id: string) => Promise<void>;
    editBoard: (id: string, name: string) => Promise<void>;
};

type stateType = {
    board?: IBoard;
    editOn: boolean;
    editedBoardTitle: string,
        editedBoardIsValide: boolean,
};

// let boardId:string;

class Board extends React.Component<propsType, stateType> {
    textInput: React.RefObject<HTMLInputElement>;
    constructor(props: propsType) {
        super(props);
        this.state = {
            editOn: false,
            editedBoardTitle: "",
        editedBoardIsValide: false,
        };
        this.textInput = React.createRef();
        this.editOn = this.editOn.bind(this);
        this.editOff = this.editOff.bind(this);
        this.editBoard = this.editBoard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

     componentDidMount() {
        let boardId = this.props.params.boardID || "";
         this.props.getBoard(boardId);
         
    }

    componentDidUpdate() {
        if (this.textInput.current) {
            this.textInput.current.focus();
        }
    }

    async editBoard(id: string, name: string) {
        await this.props.editBoard(id, name);
    }

    editOn() {
        this.setState({editOn: true});
        this.setState({editedBoardTitle: this.props.board.title});
    }

    editOff() {
        this.setState({editOn: false});
        this.setState({editedBoardIsValide: validateBoard(this.state.editedBoardTitle)});
        if (this.state.editedBoardIsValide) {
            this.editBoard(this.props.board.id, this.state.editedBoardTitle);
        }
    }
    handleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({editedBoardTitle: e.target.value});
    }

    handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            this.editOff();
        }
    }

    render() {
        
        let lists: JSX.Element[];
        if (this.props.board.lists && JSON.stringify(this.props.board.lists) !== '{}') {
            lists = this.props.board.lists.map((item, index) => {
            return <List title={item.title} cards={item.cards} key={index}></List>
        });
        } else {
            lists = [];
        }
        let { board } = this.props;
        // console.log(board);
        
        return (<div className="board">
            <Link className="board__link" to="/">Home</Link>
            <div className="board-container">
                <h1 className="board__title" onClick={this.editOn} onBlur={this.editOff}>
                    {!this.state.editOn ? <span>{board.title}</span> : 
                    <input value={this.state.editedBoardTitle} onChange={this.handleChange} onKeyUp={this.handleKeyUp} ref={this.textInput}/>}
                    <span> {board.id}</span>
                </h1>
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
  
export default withRouter(connect(mapStateToProps, { getBoard, editBoard })(Board));
// export default connect(mapStateToProps, { getBoard })(Board);