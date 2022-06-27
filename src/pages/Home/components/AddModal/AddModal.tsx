import React from 'react';

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
            <h2 className="add-modal__title">{props.title}</h2>
            <input type="text" className="add-modal__input" placeholder='New board name' />
            <button className="modal__btn btn" onClick={handleClick}>Cancel</button>
            <button className="modal__btn btn">Ok</button>
        </div>
    </div>);
}