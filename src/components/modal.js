import React from "react"
// import { Link } from "gatsby"
// import ReactMarkdown from 'react-markdown';
import cardData from "../data/data.json"
import modalStyles from "./modal.module.css"
import ModalContent from "./modal-content.js"

const sanitizeString = (string) =>
    string.split(" ").join("_");

function Modal(props) {
    if(!props.isOpen) {
        return null;
    }

    const view = props.view;
    let candidateLastName;
    let topic;

    if(view === "Overview") {
        candidateLastName = props.candidate;
    }
    else {
        candidateLastName = props.candidate.split("|")[1];
        topic = props.candidate.split("|")[0];
    }
    const candidateFirstName = cardData[candidateLastName]["First name"];
    const party = cardData[candidateLastName]["Party"];
    // console.log(view, candidate, topic);

    const printLink = "print/?candidate=" + candidateLastName + "&view=" + sanitizeString(view) + (view === "Overview" ? "" : "&topic=" + sanitizeString(topic));

    return (
        <div>
            <div
                className={modalStyles.modalBackdrop}
                onClick={() => props.onClick()}>
            </div>
            <div className={modalStyles.modal + " " + (props.isOpen ? null : modalStyles.closed)}>
                <div className={modalStyles.modalWindow}>
                    <a href={printLink} target="_blank" rel="noopener noreferrer" className={modalStyles.downloadPdfLink}>
                        Print view
                    </a>
                    <button
                        className={modalStyles.closeModalBtn}
                        onClick={() => props.onClick()}
                    >
                        ×
                    </button>
                    <ModalContent
                        candidateFirstName={candidateFirstName}
                        candidateLastName={candidateLastName}
                        view={view}
                        topic={topic}
                        party={party}
                        isPrint={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default Modal