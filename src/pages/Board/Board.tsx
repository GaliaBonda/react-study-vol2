import React, { useEffect, useState } from "react";
import List from "./components/List/List";
import './board.scss'
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { thunkEditBoard, thunkGetBoard, thunkPostList } from "../../store/modules/board/actions";
import IBoard from "../../common/interfaces/IBoard";
import { ChangeEvent, KeyboardEvent } from 'react';
import { validateTitle } from "../../common/utils/validate";
import AddModal from "../../components/AddModal/AddModal";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import IProgress from "../../common/interfaces/IProgress";


interface Props {
    board: IBoard;
    progress: IProgress;
    getBoard: (id: string) => Promise<void>;
    editBoard: (id: string, title: string) => Promise<void>;
    postList: (id: string, title: string, position: string) => Promise<void>;
};

interface State {
    board: IBoard;
    progress: IProgress;
};

function Board({ board, editBoard, getBoard, postList, progress }: Props) {
    const [editOn, setEditOn] = useState(false);
    const [editedBoardTitle, setEditedBoardTitle] = useState("");
    const [editedBoardIsValide, setEditedBoardIsValide] = useState(true);
    const [warningText, setWarningText] = useState("");
    const [addListModalShown, setAddListModalShown] = useState(false);
    const [newListIsValide, setNewListIsValide] = useState(false);
    const [newListTitle, setNewListTitle] = useState("");

    function editBoardTitle(id: string, title: string) {
        if (editedBoardIsValide) {
            editBoard(id, title);
            getBoard(id);
        } else {
            setWarningText('Invalid board title');
            setEditedBoardTitle(board?.title || "");
        }
    }

    function toggleEdit() {
        setEditOn(true);
        setWarningText("");
        setEditedBoardTitle(board.title);
        setEditedBoardIsValide(validateTitle(board.title));
    }

    function editOff() {
        setEditOn(false);
        editBoardTitle(board.id, editedBoardTitle);
    }

    function handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            editOff();
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setEditedBoardTitle(e.target.value);
        setEditedBoardIsValide(validateTitle(e.target.value));
    }

    function toggleAddListModal(shown: boolean) {
        setAddListModalShown(shown);
    }

    function updateNewListTitle(title: string) {
        setNewListTitle(title);
        setNewListIsValide(validateTitle(title));
    }

    async function addNewList() {
        setAddListModalShown(false);
        await postList(board.id, newListTitle,
            Object.keys(board.lists).length ? (Object.keys(board.lists).length + 1).toString() : "1");
        await getBoard(board.id);
    }

    const params = useParams();
    const boardId = params.boardID || "";
    useEffect(() => {
        getBoard(boardId);
    }, []);


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
            {!progress.shown && <ul className="board__list">
                {board.lists.map((item) => {
                    return <List title={item.title} id={item.id} boardId={boardId}
                        cards={item.cards ? item.cards : []}
                        key={item.id} position={item.position}
                    />
                })
                }
            </ul>}
            <button className="board__btn btn" onClick={() => toggleAddListModal(true)}>Add list</button>
            <AddModal title="Add new list" shown={addListModalShown} isValide={newListIsValide}
                handleClose={() => toggleAddListModal(false)}
                handleChange={updateNewListTitle}
                handleOk={addNewList} />
        </div>


    </div>);
}

const mapStateToProps = (state: State) => ({
    board: { ...state.board },
    progress: { ...state.progress },
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any> & Dispatch) => {
    return {
        editBoard: (id: string, title: string) => dispatch(thunkEditBoard(id, title)),
        getBoard: (id: string) => dispatch(thunkGetBoard(id)),
        postList: (id: string, title: string, position: string) => dispatch(thunkPostList(id, title, position)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);