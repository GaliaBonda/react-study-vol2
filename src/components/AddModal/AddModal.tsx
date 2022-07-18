import React, { ChangeEvent } from 'react';
import './addmodal.scss';

type propsType = {
    title: string;
    shown: boolean;
    isValide: boolean;
    handleClose: () => void;
    handleOk: () => void;
    handleChange: (value: string) => void;
};


export default function AddModal(props: propsType) {
    function handleClick() {
        props.handleClose();
    }
    function handleOkClick() {
        props.handleOk();
    }
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        props.handleChange(e.target.value);
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
                    <input type="text" className="add-modal__input" placeholder='Type name' onChange={handleChange} />
                </label>
                <div className="add-modal__btns">
                    <button className="add-modal__btn btn" onClick={handleClick}>Cancel</button>
                    {props.isValide &&
                        <button className="add-modal__btn btn" onClick={handleOkClick}>Ok</button>
                    }
                    {!props.isValide &&
                        <button className="add-modal__btn btn nonactive">Ok</button>
                    }

                </div>

            </div>
        </div>
    </div>);
}