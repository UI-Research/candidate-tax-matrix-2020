import React from "react"
import modalStyles from "./modal.module.css"

function Modal(props) {
    if(!props.isOpen) {
        return null;
    }
    return (
        <div>
            <div className={modalStyles.modalBackdrop}></div>
            <div className={modalStyles.modal + " " + (props.isOpen ? null : modalStyles.closed)}>
                <h3>This is the modal</h3>
                {props.candidate} <br />
                {props.view}
                <button
                    className={modalStyles.closeModalBtn}
                    onClick={() => props.onClick()}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal