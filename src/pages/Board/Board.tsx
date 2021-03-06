import React from "react";
import List from "./components/List/List";
import './board.scss'
import { Link, Params } from "react-router-dom";
import { withRouter } from "../../common/utils/withRouter";
import { connect } from "react-redux";
import { editBoard, editList, getBoard, postList, postCard, editCard } from "../../store/modules/board/actions";
import IBoard from "../../common/interfaces/IBoard";
import { ChangeEvent, KeyboardEvent } from 'react';
import { validateTitle } from "../../common/utils/functions";
import AddModal from "../../components/AddModal/AddModal";
import ProgressBar from "../../components/ProgressBar/ProgressBar";


type propsType = {
    board: IBoard;
    params: Readonly<Params<string>>;
    getBoard: (id: string) => Promise<void>;
    editBoard: (id: string, name: string) => Promise<void>;
    postList: (id: string, name: string, position: string) => Promise<void>;
    editList: (boardId: string, listId: string, title: string, position: string) => Promise<void>;
    postCard: (id: string, listId: string, title: string, position: string) => Promise<void>;
    editCard: (id: string, cardId: string, listId: string, title: string) => Promise<void>;
};

type stateType = {
    board?: IBoard;
    editOn: boolean;
    editedBoardTitle: string,
    editedBoardIsValide: boolean,
    warningText: string,
    addListModalShown: boolean,
    newListIsValide: boolean,
    newListName: string,
    editedListTitle: string,
    editedListTitleValid: boolean,
    newCardName: string,
    newCardIsValide: boolean,
    editedCardTitle: string,
    editedCardTitleValid: boolean,
};

class Board extends React.Component<propsType, stateType> {

    constructor(props: propsType) {
        super(props);
        this.state = {
            editOn: false,
            editedBoardTitle: "",
            editedBoardIsValide: true,
            warningText: "",
            addListModalShown: false,
            newListIsValide: false,
            newListName: "",
            editedListTitle: "",
            editedListTitleValid: true,
            newCardName: "",
            newCardIsValide: false,
            editedCardTitle: '',
            editedCardTitleValid: true,
        };

        this.editOn = this.editOn.bind(this);
        this.editOff = this.editOff.bind(this);
        this.editBoard = this.editBoard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.showAddListModal = this.showAddListModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.updateNewListName = this.updateNewListName.bind(this);
        this.addNewList = this.addNewList.bind(this);
        this.editListTitle = this.editListTitle.bind(this);
        this.updateListTitle = this.updateListTitle.bind(this);
        this.updateNewCardName = this.updateNewCardName.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.editCard = this.editCard.bind(this);
        this.updateCardTitle = this.updateCardTitle.bind(this);
    }

    async componentDidMount() {

        let boardId = this.props.params.boardID || "";

        await this.props.getBoard(boardId);
    }

    async editBoard(id: string, name: string) {
        if (this.state.editedBoardIsValide) {
            await this.props.editBoard(id, name);
            await this.props.getBoard(id);
        } else {
            this.setState({ warningText: 'Invalid board title' });
            this.setState({ editedBoardTitle: this.props.board.title });
        }


    }

    editOn() {
        this.setState({ editOn: true });
        this.setState({ warningText: "" });

        this.setState({ editedBoardTitle: this.props.board.title });
        this.setState({ editedBoardIsValide: validateTitle(this.props.board.title) });
    }

    editOff() {
        this.setState({ editOn: false });
        this.editBoard(this.props.board.id, this.state.editedBoardTitle);

    }
    handleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ editedBoardTitle: e.target.value });
        this.setState({ editedBoardIsValide: validateTitle(e.target.value) });
    }

    handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            this.editOff();
        }
    }

    showAddListModal() {
        this.setState({ addListModalShown: true });

    }

    closeAddModal() {
        this.setState({ addListModalShown: false });
    }

    updateNewListName(name: string) {
        this.setState({ newListName: name });
        this.setState({ newListIsValide: validateTitle(name) });
    }

    async addNewList() {


        this.setState({ addListModalShown: false });
        await this.props.postList(this.props.board.id, this.state.newListName,
            Object.keys(this.props.board.lists).length ? (Object.keys(this.props.board.lists).length + 1).toString() : "1");
        await this.props.getBoard(this.props.board.id);
    }

    editListTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ editedListTitle: e.target.value });
        this.setState({ editedListTitleValid: validateTitle(e.target.value) });

    }
    async updateListTitle(id: string, position: string) {
        if (this.state.editedListTitleValid) {
            await this.props.editList(this.props.board.id, id, this.state.editedListTitle, position);

        }

    }
    updateNewCardName(title: string) {
        this.setState({ newCardName: title });
        this.setState({ newCardIsValide: validateTitle(title) });
    }

    async addNewCard(id: string, position: string) {
        if (this.state.newCardIsValide) {
            await this.props.postCard(this.props.board.id, id, this.state.newCardName, position);
            await this.props.getBoard(this.props.board.id);

        }
    }

    editCard(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ editedCardTitle: e.target.value });
        this.setState({ editedCardTitleValid: validateTitle(e.target.value) });
    }

    async updateCardTitle(cardId: string, listId: string) {
        if (this.state.editedCardTitleValid) {
            await this.props.editCard(this.props.board.id, cardId, listId, this.state.editedCardTitle);
            await this.props.getBoard(this.props.board.id);
        }

    }

    render() {

        let lists: JSX.Element[];
        if (this.props.board.lists && JSON.stringify(this.props.board.lists) !== '{}') {
            lists = this.props.board.lists.map((item, index) => {
                return <List title={item.title} id={item.id} handleChange={this.editListTitle}
                    cards={item.cards ? item.cards : []}
                    key={item.id} position={item.position}
                    updateTitle={() => this.updateListTitle(item.id, item.position)}
                    newCardIsValide={this.state.newCardIsValide}
                    updateNewCardName={this.updateNewCardName}
                    addNewCard={() => this.addNewCard(item.id, item.cards ? (Object.values(item.cards).length + 1).toString() : "1")}
                    handleCardChange={this.editCard} editedCardTitle={this.state.editedCardTitle}
                    updateCardTitle={(cardId) => this.updateCardTitle(cardId, item.id)}
                />
            });
        } else {
            lists = [];
        }
        let { board } = this.props;

        return (<div className="board">
            <Link className="board__link" to="/">Home</Link>
            <ProgressBar title="Board processing..." />
            <div className="board-container">
                <h1 className="board__title" onClick={this.editOn} onBlur={this.editOff}>
                    {!this.state.editOn ? <span className="board__title-span">{board.title}</span> :
                        <input autoFocus className="board__input board__title-span" value={this.state.editedBoardTitle} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />}
                    <span className="board__title-id"> {board.id}</span>
                </h1>
                {(this.state.warningText.length > 0) && <p className="warning board__warning">{this.state.warningText}</p>}
                <ul className="board__list">{lists}</ul>
                <button className="board__btn btn" onClick={this.showAddListModal}>Add list</button>
                <AddModal title="Add new list" shown={this.state.addListModalShown} isValide={this.state.newListIsValide}
                    handleClose={this.closeAddModal}
                    handleChange={this.updateNewListName}
                    handleOk={this.addNewList} />
            </div>


        </div>);
    }
}
const mapStateToProps = (state: stateType) => ({
    ...state.board,
});

export default connect(mapStateToProps, { getBoard, editBoard, postList, editList, postCard, editCard })(withRouter(Board));