import React from 'react';
import './addmodal.scss';

type propsType = {
    title: string;
    shown: boolean;
    handleClose: () => void;
};

// type stateType = {
//     shown: boolean;
// }

export default function AddModal(props: propsType) {
    // const [shown, setShown] = useState(true);
    function handleClick() {
        props.handleClose();
    }
    if (!props.shown) {
        return null;
    }
    // if (!shown) return null;
    return (<div className="add-modal">
        <div className="modal-overlay">
            <div className="add-modal__main">
                <h2 className="add-modal__title">{props.title}</h2>
                <label className="add-modal__label">
                    <input type="text" className="add-modal__input" placeholder='New board name' />
                </label>
                <div className="add-modal__btns">
                    <button className="add-modal__btn btn" onClick={handleClick}>Cancel</button>
                    <button className="add-modal__btn btn">Ok</button>
                </div>

            </div>
        </div>
    </div>);
}