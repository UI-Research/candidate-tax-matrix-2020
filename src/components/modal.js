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
                <p className={modalStyles.downloadPdfLink}>Download PDF</p>
                <div style={{overflow: `auto`}}>
                    <div className={modalStyles.partyLogo}></div>
                    <h3 className={modalStyles.candidateName}>{props.candidate}</h3>
                </div>
                <button
                    className={modalStyles.closeModalBtn}
                    onClick={() => props.onClick()}
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default Modal