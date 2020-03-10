import React from "react"
// import ReactMarkdown from 'react-markdown'
import analysisData from "../data/analysis_data.json"
import cardStyles from "./card.module.css"
import BarChart from "./bar-chart.js"

function ExtendedAnalysis(props) {
    const isPrint = props.isPrint;
    // console.log(cardData.filter((candidate) => candidate.Name === "Biden"));
    let candidateLastName = props.candidate;
    // let candidateFirstName = analysisData[candidateLastName]["First name"];
    let party = analysisData[candidateLastName]["Party"];
    let droppedOut = analysisData[candidateLastName]["Dropped out"] === "Y";

    return (
        <>
            <h4 className={cardStyles.sectionTitle + " " + (isPrint ? cardStyles.print : "") + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican) + " " + (droppedOut ? cardStyles.inactive : "")}>Revenue Impact (2021–30)</h4>
            <p>{analysisData[candidateLastName]["Revenue impact"]}</p>
            <h4 className={cardStyles.sectionTitle + " " + (isPrint ? cardStyles.print : "") + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican) + " " + (droppedOut ? cardStyles.inactive : "")}>Percent Change in After-Tax Income (2021)</h4>
            <BarChart />
        </>
    )
}

export default ExtendedAnalysis