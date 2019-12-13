import React from "react"
import cardData from "../data/data.json"
import modalContentStyles from "./modal-content.module.css"
import ContentDiv from "./content-div.js"

function ModalContent(props) {
    if(props.view === "Overview") {
        return (
            <div className="contentContainer"></div>
        )
    }
    else {
        const isPrint = props.isPrint;
        const data = cardData[props.candidateLastName][props.view];
        const party = props.party,
              candidateFirstName = props.candidateFirstName,
              candidateLastName = props.candidateLastName;
        const topics = Object.keys(data).sort();
        const selectedTopicPos = topics.indexOf(props.topic);
        topics.splice(selectedTopicPos, 1);
        const remainingTopics = topics.map((topic) =>
            <ContentDiv
                key={topic}
                party={party}
                topic={topic}
                data={data[topic]}
                isPrint={isPrint}
            />
        );

        return (
            <>
            <div style={{overflow: `auto`}}>
                <div className={modalContentStyles.partyLogo + " " + (isPrint ? modalContentStyles.print : "") + " " + (party === "Democratic" ? modalContentStyles.democrat : modalContentStyles.republican)}>{party === "Democratic" ? "D" : "R"}</div>
                <h3 className={modalContentStyles.candidateName + " " + (isPrint ? modalContentStyles.print : "") + " " + (party === "Democratic" ? modalContentStyles.democrat : modalContentStyles.republican)}>{candidateFirstName + " " + candidateLastName}</h3>
            </div>
            <div className="contentContainer">
                <ContentDiv
                    party={props.party}
                    topic={props.topic}
                    data={data[props.topic]}
                    isPrint={isPrint}
                />
                <div className={modalContentStyles.separator + " " + (isPrint ? modalContentStyles.print : "")}><span className={modalContentStyles.separatorLine + " " + (isPrint ? modalContentStyles.print : "")}></span>Other proposals by {props.view === "Issue areas" ? "issue area" : "type of tax"}<span className={modalContentStyles.separatorLine + " " + (isPrint ? modalContentStyles.print : "")}></span></div>
                {remainingTopics}
            </div>
            </>
        )
    }

}

export default ModalContent