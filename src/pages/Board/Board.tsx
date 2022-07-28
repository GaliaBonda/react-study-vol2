import React, { useEffect, useState } from "react";
import List from "./components/List/List";
import './board.scss'
import { Link, Params, useParams } from "react-router-dom";
import { withRouter } from "../../common/utils/withRouter";
import { connect } from "react-redux";
import { editBoard, editList, getBoard, postList, postCard, editCard } from "../../store/modules/board/actions";
import IBoard from "../../common/interfaces/IBoard";
import { ChangeEvent, KeyboardEvent } from 'react';
import { validateTitle } from "../../common/utils/functions";
import AddModal from "../../components/AddModal/AddModal";
import ProgressBar from "../../components/ProgressBar/ProgressBar";


interface Props {
    board: IBoard;
    getBoard: (id: string) => Promise<void>;
    editBoard: (id: string, name: string) => Promise<void>;
    postList: (id: string, name: string, position: string) => Promise<void>;
    editList: (boardId: string, listId: string, title: string, position: string) => Promise<void>;
    postCard: (id: string, listId: string, title: string, position: string) => Promise<void>;
    editCard: (id: string, cardId: string, listId: string, title: string) => Promise<void>;
};

interface State {
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

function Board(props: Props) {
    const [newCardIsValide, setCardIsValide] = useState(false);
    const [editOn, setEditOn] = useState(false);
    const [editedBoardTitle, setEditedBoardTitle] = useState("");
    const [editedBoardIsValide, setEditedBoardIsValide] = useState(true);
    const [warningText, setWarningText] = useState("");
    const [addListModalShown, setAddListModalShown] = useState(false);
    const [newListIsValide, setNewListIsValide] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [editedListTitle, setEditedListTitle] = useState("");
    const [editedListTitleValid, setEditedListTitleValid] = useState(true);
    const [newCardName, setNewCardName] = useState("");
    const [editedCardTitle, setEditedCardTitle] = useState("");
    const [editedCardTitleValid, setEditedCardTitleValid] = useState(true);

    async function editBoard(id: string, name: string) {
        if (editedBoardIsValide) {
            await props.editBoard(id, name);
            await props.getBoard(id);
        } else {
            setWarningText('Invalid board title');
            setEditedBoardTitle(props.board?.title || "");
        }


    }

    function toggleEdit() {
        setEditOn(true);
        setWarningText("");

        setEditedBoardTitle(props.board.title);
        setEditedBoardIsValide(validateTitle(props.board.title));
    }

    function editOff() {
        setEditOn(false);
        editBoard(props.board.id, editedBoardTitle);

    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setEditedBoardTitle(e.target.value);
        setEditedBoardIsValide(validateTitle(e.target.value));
    }

    function handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            editOff();
        }
    }

    function showAddListModal() {
        setAddListModalShown(true);

    }

    function closeAddModal() {
        setAddListModalShown(false);
    }

    function updateNewListName(name: string) {
        setNewListName(name);
        setNewListIsValide(validateTitle(name));
    }

    async function addNewList() {
        setAddListModalShown(false);
        await props.postList(props.board.id, newListName,
            Object.keys(props.board.lists).length ? (Object.keys(props.board.lists).length + 1).toString() : "1");
        await props.getBoard(props.board.id);
    }

    function editListTitle(e: ChangeEvent<HTMLInputElement>) {
        setEditedListTitle(e.target.value);
        setEditedListTitleValid(validateTitle(e.target.value));

    }
    async function updateListTitle(id: string, position: string) {
        if (editedListTitleValid) {
            await props.editList(props.board.id, id, editedListTitle, position);

        }

    }
    function updateNewCardName(title: string) {
        setNewCardName(title);
        setCardIsValide(validateTitle(title));
    }

    async function addNewCard(id: string, position: string) {
        if (newCardIsValide) {
            await props.postCard(props.board.id, id, newCardName, position);
            await props.getBoard(props.board.id);

        }
    }

    function editCard(e: ChangeEvent<HTMLInputElement>) {
        setEditedCardTitle(e.target.value);
        setEditedCardTitleValid(validateTitle(e.target.value));
    }

    async function updateCardTitle(cardId: string, listId: string) {
        if (editedCardTitleValid) {
            await props.editCard(props.board.id, cardId, listId, editedCardTitle);
            await props.getBoard(props.board.id);
        }

    }

    const params = useParams();
    const boardId = params.boardID || "";
    useEffect(() => {


        props.getBoard(boardId);
    }, []);

    let lists: JSX.Element[];
    if (props.board.lists && JSON.stringify(props.board.lists) !== '{}') {
        lists = props.board.lists.map((item, index) => {
            return <List title={item.title} id={item.id} boardId={boardId} handleChange={editListTitle}
                cards={item.cards ? item.cards : []}
                key={item.id} position={item.position}
                updateTitle={() => updateListTitle(item.id, item.position)}
                newCardIsValide={newCardIsValide}
                updateNewCardName={updateNewCardName}
                addNewCard={() => addNewCard(item.id, item.cards ? (Object.values(item.cards).length + 1).toString() : "1")}
                handleCardChange={editCard} editedCardTitle={editedCardTitle}
                updateCardTitle={(cardId) => updateCardTitle(cardId, item.id)}
            />
        });
    } else {
        lists = [];
    }
    let { board } = props;

    return (<div className="board">
        <Link className="board__link" to="/">Home</Link>
        <ProgressBar title="Board processing..." />
        <div className="board-container">
            <h1 className="board__title" onClick={toggleEdit} onBlur={editOff}>
                {!editOn ? <span className="board__title-span">{board.title}</span> :
                    <input autoFocus className="board__input board__title-span" value={editedBoardTitle}
                        onChange={handleChange} onKeyUp={handleKeyUp} />}
                <span className="board__title-id"> {board.id}</span>
            </h1>
            {(warningText.length > 0) && <p className="warning board__warning">{warningText}</p>}
            <ul className="board__list">{lists}</ul>
            <button className="board__btn btn" onClick={showAddListModal}>Add list</button>
            <AddModal title="Add new list" shown={addListModalShown} isValide={newListIsValide}
                handleClose={closeAddModal}
                handleChange={updateNewListName}
                handleOk={addNewList} />
        </div>


    </div>);
}

const mapStateToProps = (state: State) => ({
    ...state.board,
});

export default connect(mapStateToProps,
    { getBoard, editBoard, postList, editList, postCard, editCard })(Board);