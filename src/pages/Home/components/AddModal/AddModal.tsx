import React, { useState } from 'react';

type propsType = {
    title: string;
    shown: boolean;
};

type stateType = {
    shown: boolean;
}

export default function AddModal(props: propsType) {
    const [shown, setShown] = useState(props.shown);
    function handleClick() {
        if (shown) setShown(false);
    }
    
    if (!shown) return null;
    return (<div className="add-modal">
        <div className="modal-overlay">
            <h2 className="add-modal__title">{props.title}</h2>
            <input type="text" className="add-modal__input" placeholder='New board name' />
            <button className="modal__btn btn" onClick={handleClick}>Cancel</button>
            <button className="modal__btn btn">Ok</button>
        </div>
    </div>);
}