import React from "react"
import ReactMarkdown from 'react-markdown'
import cardData from "../data/data.json"
import cardStyles from "./card.module.css"
import ContentDiv from "./content-div.js"

function Card(props) {
    const isPrint = props.isPrint;
    // console.log(cardData.filter((candidate) => candidate.Name === "Biden"));
    let candidateLastName = props.candidate;
    if(props.view !== "Overview") candidateLastName = props.candidate.split("|")[1];
    let candidateFirstName = cardData[candidateLastName]["First name"];
    let party = cardData[candidateLastName]["Party"];
    let cardTitle = "Overview";
    let viewMoreText = "View overview";
    let cardBullets = <ReactMarkdown source={cardData[candidateLastName]["Overview"]} linkTarget="_blank" />;

    if(props.view === "Issue areas") {
        viewMoreText = "View proposal by issue area";
        let issue = props.candidate.split("|")[0];
        cardTitle = issue;

        let cardText = cardData[candidateLastName]["Issue areas"][issue];

        cardBullets = <ContentDiv
            party={party}
            topic=""
            data={cardText}
        />
    }
    else if(props.view === "Tax types") {
        viewMoreText = "View proposal by tax type";
        let taxType = props.candidate.split("|")[0];
        cardTitle = taxType;

        let cardText = cardData[candidateLastName]["Tax types"][taxType];

        cardBullets = <ContentDiv
            party={party}
            topic=""
            data={cardText}
        />
    }

    return (
        <div className={isPrint ? cardStyles.printCard : cardStyles.card}>
            <h5 className={cardStyles.cardTitle}>{cardTitle}</h5>
            <div style={{overflow: `auto`}}>
                <div className={cardStyles.partyLogo + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican)}>{party === "Democratic" ? "D" : "R"}</div>
                <h3 className={cardStyles.candidateName + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican)}>{candidateFirstName + " " + candidateLastName}</h3>
            </div>
            <h4 className={cardStyles.sectionTitle + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican)}>{props.view === "Overview" ? "Overview of tax proposals" : "Proposal"}</h4>
            <div>{cardBullets}</div>
            {props.view !== "Overview" && !isPrint && <p
                                            className={cardStyles.viewMoreLink}
                                            onClick={() => props.onClick(props.candidate)}
                                        >
                                            {viewMoreText}
                                        </p>
            }
        </div>
    )
}

export default Card