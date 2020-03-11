import React from "react"
// import ReactMarkdown from 'react-markdown'
import analysisData from "../data/analysis_data.json"
import cardStyles from "./card.module.css"
import BarChart from "./bar-chart.js"

import BidenChart from "../images/Biden.png"

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
            <p style={{fontSize: 16}}>{analysisData[candidateLastName]["Revenue impact"]}</p>
            <h4 className={cardStyles.sectionTitle + " " + (isPrint ? cardStyles.print : "") + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican) + " " + (droppedOut ? cardStyles.inactive : "")}>Percent Change in After-Tax Income (2021)</h4>
            {!props.isModal && <BarChart candidate={candidateLastName} /> }
            {props.isModal && <img src={BidenChart} style={{maxWidth: 600, width: `100%`}} /> }
        </>
    )
}

export default ExtendedAnalysis