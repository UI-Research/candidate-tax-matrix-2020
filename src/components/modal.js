import React from "react"
import cardData from "../data/data.json"
import modalStyles from "./modal.module.css"

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
        candidateLastName = props.candidate.split("|")[0];
        topic = props.candidate.split("|")[1];
    }
    const candidateFirstName = cardData[candidateLastName]["First name"];
    const party = cardData[candidateLastName]["Party"];
    // console.log(view, candidate, topic);

    return (
        <div>
            <div className={modalStyles.modalBackdrop}></div>
            <div className={modalStyles.modal + " " + (props.isOpen ? null : modalStyles.closed)}>
                <p className={modalStyles.downloadPdfLink}>Download PDF</p>
                <div style={{overflow: `auto`}}>
                    <div className={modalStyles.partyLogo + " " + (party === "Democrat" ? modalStyles.democrat : modalStyles.republican)}>{party === "Democrat" ? "D" : "R"}</div>
                    <h3 className={modalStyles.candidateName + " " + (party === "Democrat" ? modalStyles.democrat : modalStyles.republican)}>{candidateFirstName + " " + candidateLastName}</h3>
                </div>
                <button
                    className={modalStyles.closeModalBtn}
                    onClick={() => props.onClick()}
                >
                    ×
                </button>
            </div>
        </div>
    );
}

export default Modal