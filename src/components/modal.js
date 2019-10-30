import React from "react"
import cardData from "../data/data.json"
import modalStyles from "./modal.module.css"

function ContentDiv(props) {
    const contentBullets = props.data.map((bullet, index) =>
        <li key={index}>{bullet}</li>
    );

    return (
        <div>
            <h4 className={modalStyles.topicSubhead + " " + (props.party === "Democrat" ? modalStyles.democrat : modalStyles.republican)}>Proposal on {props.topic.toLowerCase()}</h4>
            <ul className={modalStyles.contentList}>
                {contentBullets}
            </ul>
        </div>
    )
}

function ModalContent(props) {
    if(props.view === "Overview") {
        return (
            <div className="contentContainer"></div>
        )
    }
    else {
        const data = cardData[props.candidateLastName][props.view];

        const topics = Object.keys(data).sort();
        const selectedTopicPos = topics.indexOf(props.topic);
        topics.splice(selectedTopicPos, 1);
        const remainingTopics = topics.map((topic) =>
            <ContentDiv
                party={props.party}
                topic={topic}
                data={data[topic]}
            />
        );

        return (
            <div className="contentContainer">
                <ContentDiv
                    party={props.party}
                    topic={props.topic}
                    data={data[props.topic]}
                />
                <div className={modalStyles.separator}><span className={modalStyles.separatorLine}></span>Other proposals by {props.view === "Issue areas" ? "issue area" : "type of tax"}<span className={modalStyles.separatorLine}></span></div>
                {remainingTopics}
            </div>
        )
    }

}

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
                <ModalContent
                    candidateLastName={candidateLastName}
                    view={view}
                    topic={topic}
                    party={party}
                />
            </div>
        </div>
    );
}

export default Modal