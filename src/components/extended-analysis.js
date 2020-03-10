import React from "react"
// import ReactMarkdown from 'react-markdown'
import cardData from "../data/data.json"
import cardStyles from "./card.module.css"
// import ContentDiv from "./content-div.js"
// import Corrections from "./corrections.js"
import BarChart from "./bar-chart.js"

function ExtendedAnalysis(props) {
    const isPrint = props.isPrint;
    // console.log(cardData.filter((candidate) => candidate.Name === "Biden"));
    let candidateLastName = props.candidate;
    let candidateFirstName = cardData[candidateLastName]["First name"];
    let party = cardData[candidateLastName]["Party"];
    let droppedOut = cardData[candidateLastName]["Dropped out"] === "Y";
    let cardTitle = "Overview";
    let viewMoreText = "View overview";
    let cardBullets = cardData[candidateLastName]["Overview"];
    let correctionsBullets;

    return (
        <div className={cardStyles.card + " " + (isPrint ? cardStyles.print : "") + " " + (droppedOut ? cardStyles.inactive : "")}>
            <h5 className={cardStyles.cardTitle + " " + (isPrint ? cardStyles.print : "")  + " " + (droppedOut ? cardStyles.inactive : "")}>Revenue Impact (2021–30)</h5>

            <BarChart />
        </div>
    )
}

export default ExtendedAnalysis