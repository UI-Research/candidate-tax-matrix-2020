import React from "react"
// import { Link } from "gatsby"
import ReactMarkdown from 'react-markdown';
import cardData from "../data/data.json"
import modalStyles from "./modal.module.css"

const sanitizeString = (string) =>
    string.split(" ").join("_");

function ContentDiv(props) {
    const contentBullets = props.data.map((bullet, index) => {
        if (bullet.indexOf("•") > -1) {
            const subbullets = bullet.split("•");
            const subbulletsList = subbullets.slice(0).map((subbullet, index) =>
                <li key={index}><ReactMarkdown source={subbullet} linkTarget="_blank" /></li>
            );

            return (
                <li key={index}>{subbullets[0]}
                    <ul>
                        {subbulletsList}
                    </ul>
                </li>
            )
        }
        else {
            return <li key={index}><ReactMarkdown source={bullet} linkTarget="_blank" /></li>
        }
    });

    return (
        <div>
            <h4 className={modalStyles.topicSubhead + " " + (props.party === "Democrat" ? modalStyles.democrat : modalStyles.republican)}>{props.topic}</h4>
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

    const printLink = "print/?candidate=" + candidateLastName + "&view=" + sanitizeString(view) + "&topic=" + sanitizeString(topic);

    return (
        <div>
            <div
                className={modalStyles.modalBackdrop}
                onClick={() => props.onClick()}>
            </div>
            <div className={modalStyles.modal + " " + (props.isOpen ? null : modalStyles.closed)}>
                <div className={modalStyles.modalWindow}>
                    <a href={printLink} target="_blank" className={modalStyles.downloadPdfLink}>
                        Print view
                    </a>
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
        </div>
    );
}

export default Modal