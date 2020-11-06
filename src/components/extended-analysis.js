import React from "react"
// import ReactMarkdown from 'react-markdown'
import analysisData from "../data/analysis_data.json"
import cardStyles from "./card.module.css"
import BarChart from "./bar-chart.js"

import BidenChart from "../images/Biden.png"
import SandersChart from "../images/Sanders.png"

function ExtendedAnalysis(props) {
    const isPrint = props.isPrint;
    // console.log(cardData.filter((candidate) => candidate.Name === "Biden"));
    let candidateLastName = props.candidate;
    // let candidateFirstName = analysisData[candidateLastName]["First name"];
    let party = analysisData[candidateLastName]["Party"];
    let droppedOut = analysisData[candidateLastName]["Dropped out"] === "Y";

    let chartImageName;
    if(candidateLastName === "Biden") chartImageName = BidenChart;
    else if(candidateLastName === "Sanders") chartImageName = SandersChart;

    return (
        <>
            <h4 className={cardStyles.sectionTitle + " " + (isPrint ? cardStyles.print : "") + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican) + " " + (droppedOut && !props.isModal ? cardStyles.inactive : "")}>Revenue Impact (2021–30)</h4>
            <p className={cardStyles.cardContent + " " + (isPrint ? cardStyles.print : "") + " " + (droppedOut && !props.isModal ? cardStyles.inactive : "") }>{analysisData[candidateLastName]["Revenue impact"]}</p>
            <h4 className={cardStyles.sectionTitle + " " + (isPrint ? cardStyles.print : "") + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican) + " " + (droppedOut && !props.isModal ? cardStyles.inactive : "")}>Percent Change in After-Tax Income ({analysisData[candidateLastName]["Analysis year"]})</h4>
            {!props.isModal && <BarChart candidate={candidateLastName} droppedOut={droppedOut} isPrint={isPrint} /> }
            {props.isModal && <img src={chartImageName} style={{maxWidth: 600, width: `100%`}} /> }
            {!props.isModal &&
                candidateLastName === "Biden" &&
                <p style={{fontSize: `14px`,
                           lineHeight: `18px`,
                           fontStyle: `italic`}}>Note: These estimates were corrected on November 6, 2020. More details are available <a href="https://www.taxpolicycenter.org/taxvox/tpc-revises-its-revenue-estimate-bidens-tax-plan-downward-21-trillion-over-10-years" target="_blank" rel="noreferrer noopener">here</a>.</p>}
            {!props.isModal && <a href={analysisData[candidateLastName]["Link"]} target="_blank" style={{ color: droppedOut && !isPrint ? `#BCBEC0` : `` }}><p>See the analysis</p></a>}
        </>
    )
}

export default ExtendedAnalysis