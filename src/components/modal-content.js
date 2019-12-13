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
        const data = cardData[props.candidateLastName][props.view];

        const topics = Object.keys(data).sort();
        const selectedTopicPos = topics.indexOf(props.topic);
        topics.splice(selectedTopicPos, 1);
        const remainingTopics = topics.map((topic) =>
            <ContentDiv
                key={topic}
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
                <div className={(props.isPrint) ? modalContentStyles.printSeparator : modalContentStyles.separator}><span className={(props.isPrint) ? modalContentStyles.printSeparatorLine : modalContentStyles.separatorLine}></span>Other proposals by {props.view === "Issue areas" ? "issue area" : "type of tax"}<span className={(props.isPrint) ? modalContentStyles.printSeparatorLine : modalContentStyles.separatorLine}></span></div>
                {remainingTopics}
            </div>
        )
    }

}

export default ModalContent