import React from "react"
import cardData from "../data/data.json"
import analysisData from "../data/analysis_data.json"
import modalContentStyles from "./modal-content.module.css"
import ContentDiv from "./content-div.js"
import Corrections from "./corrections.js"
import ExtendedAnalysis from "./extended-analysis.js"


function ModalContent(props) {
    const isPrint = props.isPrint;
    const data = cardData[props.candidateLastName][props.view];
    const party = props.party,
          candidateFirstName = props.candidateFirstName,
          candidateLastName = props.candidateLastName;
    let content;

    if(props.view === "Overview") {
        let bullets = analysisData[candidateLastName]["Bullets"].map((bullet, index) =>
            <li key={index}>{bullet}</li>
        );

        content =
            <div className="contentContainer">
                <ExtendedAnalysis
                    isPrint={isPrint}
                    isModal={true}
                    candidate={candidateLastName}
                />
                <ul className={modalContentStyles.analysisBullets}>
                    {bullets}
                </ul>
                <h4 className={modalContentStyles.sectionTitle + " " + (isPrint ? modalContentStyles.print : "") + " " + (party === "Democratic" ? modalContentStyles.democrat : modalContentStyles.republican)}>Overview of tax proposals</h4>
                <div className={modalContentStyles.content + " " + (isPrint ? modalContentStyles.print : "")}>{data}</div>
                {candidateLastName === "Biden" &&
                    <p style={{ fontSize: `14px`,
                                lineHeight: `18px`,
                                fontStyle: `italic`,
                                marginTop: `20px` }}>
                        Note: The estimates of revenue impact and percent change in after-tax income are based on the Tax Policy Center’s analysis of Biden’s proposals as of February 23, 2020. The overview of his tax proposals is updated as his campaign clarifies or releases new information.
                    </p>
                }
            </div>
    }
    else {
        const topics = Object.keys(data);
        const selectedTopicPos = topics.indexOf(props.topic);
        topics.splice(selectedTopicPos, 1);
        const remainingTopics = topics.map((topic) =>
            <>
                <ContentDiv
                    key={topic}
                    party={party}
                    topic={topic}
                    data={data[topic]["Bullets"]}
                    isPrint={isPrint}
                />
                {(data[topic]["Corrections"][0] !== "None") && <Corrections data={data[topic]["Corrections"]} /> }
            </>
        );

        content = <div className="contentContainer">
                <ContentDiv
                    party={props.party}
                    topic={props.topic}
                    data={data[props.topic]["Bullets"]}
                    isPrint={isPrint}
                />
                {(data[props.topic]["Corrections"][0] !== "None") && <Corrections data={data[props.topic]["Corrections"]} />}
                <div className={modalContentStyles.separator + " " + (isPrint ? modalContentStyles.print : "")}><span className={modalContentStyles.separatorLine + " " + (isPrint ? modalContentStyles.print : "")}></span>Other proposals by {props.view === "Issue areas" ? "issue area" : "type of tax"}<span className={modalContentStyles.separatorLine + " " + (isPrint ? modalContentStyles.print : "")}></span></div>
                {remainingTopics}
            </div>;
    }
    return (
        <>
        <div style={{overflow: `auto`}}>
            <div className={modalContentStyles.partyLogo + " " + (isPrint ? modalContentStyles.print : "") + " " + (party === "Democratic" ? modalContentStyles.democrat : modalContentStyles.republican)}>{party === "Democratic" ? "D" : "R"}</div>
            <h3 className={modalContentStyles.candidateName + " " + (isPrint ? modalContentStyles.print : "") + " " + (party === "Democratic" ? modalContentStyles.democrat : modalContentStyles.republican)}>{candidateFirstName + " " + candidateLastName}</h3>
        </div>
        {content}
        </>
    )

}

export default ModalContent