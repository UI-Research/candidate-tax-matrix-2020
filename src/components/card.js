import React from "react"
import ReactMarkdown from 'react-markdown'
import cardData from "../data/data.json"
import cardStyles from "./card.module.css"
import ContentDiv from "./content-div.js"
import Corrections from "./corrections.js"

function Card(props) {
    const isPrint = props.isPrint;
    // console.log(cardData.filter((candidate) => candidate.Name === "Biden"));
    let candidateLastName = props.candidate;
    if(props.view !== "Overview") candidateLastName = props.candidate.split("|")[1];
    let candidateFirstName = cardData[candidateLastName]["First name"];
    let party = cardData[candidateLastName]["Party"];
    let droppedOut = cardData[candidateLastName]["Dropped out"] === "Y";
    let cardTitle = "Overview";
    let viewMoreText = "View overview";
    let cardBullets = <ReactMarkdown source={cardData[candidateLastName]["Overview"]} linkTarget="_blank" />;
    let correctionsBullets;

    if(props.view === "Issue areas") {
        viewMoreText = "View proposal by issue area";
        let issue = props.candidate.split("|")[0];
        cardTitle = issue;

        let cardText = cardData[candidateLastName]["Issue areas"][issue]["Bullets"];

        cardBullets = <ContentDiv
            party={party}
            droppedOut={droppedOut}
            topic=""
            data={cardText}
        />

        let corrections = cardData[candidateLastName]["Issue areas"][issue]["Corrections"];

        if(corrections[0] !== "None") {
            correctionsBullets = <Corrections
                data={corrections}
            />
        }
    }
    else if(props.view === "Tax types") {
        viewMoreText = "View proposal by tax type";
        let taxType = props.candidate.split("|")[0];
        cardTitle = taxType;

        let cardText = cardData[candidateLastName]["Tax types"][taxType]["Bullets"];

        cardBullets = <ContentDiv
            party={party}
            droppedOut={droppedOut}
            topic=""
            data={cardText}
        />

        let corrections = cardData[candidateLastName]["Tax types"][taxType]["Corrections"];

        if(corrections[0] !== "None") {
            correctionsBullets = <Corrections
                data={corrections}
            />
        }
    }

    return (
        <div className={cardStyles.card + " " + (isPrint ? cardStyles.print : "") + " " + (droppedOut ? cardStyles.inactive : "")}>
            <h5 className={cardStyles.cardTitle + " " + (isPrint ? cardStyles.print : "")  + " " + (droppedOut ? cardStyles.inactive : "")}>{cardTitle}</h5>
            <div style={{overflow: `auto`}}>
                <div className={cardStyles.partyLogo + " " + (isPrint ? cardStyles.print : "") + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican) + " " + (droppedOut ? cardStyles.inactive : "")}>{party === "Democratic" ? "D" : "R"}</div>
                <h3 className={cardStyles.candidateName + " " + (isPrint ? cardStyles.print : "") + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican) + " " + (droppedOut ? cardStyles.inactive : "")}>{candidateFirstName + " " + candidateLastName}</h3>
            </div>
            <h4 className={cardStyles.sectionTitle + " " + (isPrint ? cardStyles.print : "") + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican) + " " + (droppedOut ? cardStyles.inactive : "")}>{props.view === "Overview" ? "Overview of tax proposals" : "Proposal"}</h4>
            <div className={cardStyles.cardContent + " " + (isPrint ? cardStyles.print : "")  + " " + (droppedOut ? cardStyles.inactive : "")}>{cardBullets}</div>
            <div className={cardStyles.cardContent + " " + (isPrint ? cardStyles.print : "")  + " " + (droppedOut ? cardStyles.inactive : "")}>{correctionsBullets}</div>
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