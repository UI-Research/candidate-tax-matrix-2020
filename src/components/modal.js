import React from "react"
import modalStyles from "./modal.module.css"

function Modal(props) {
    return (
        <div className={modalStyles.modal + " " + (props.isOpen ? "" : modalStyles.closed)}>
            This is the modal <br />
            {props.candidate} <br />
            {props.view}
            <button
                className={modalStyles.closeModalBtn}
                onClick={() => props.onClick()}
            >
                Close
            </button>
        </div>
    );
}

export default Modal