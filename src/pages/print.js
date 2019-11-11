import React from "react"
import logo from "../images/tpcLogo.png"
import cardData from "../data/data.json"
import printStyles from "./print.module.css"

const unsanitizeString = (string) =>
    string.split("_").join(" ");

const parseQueryString = (queryString) => {
    let queryObj = {}
    queryString.split("&").forEach(p => {
        let field = p.split("=")[0];
        let value = unsanitizeString(p.split("=")[1]);
        queryObj[field] = value;
    })

    return queryObj;
}

function ContentDiv(props) {
    const contentBullets = props.data.map((bullet, index) => {
        if (bullet.indexOf("•") > -1) {
            const subbullets = bullet.split("•");
            const subbulletsList = subbullets.slice(0).map((subbullet, index) =>
                <li key={index}>{subbullet}</li>
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
            return <li key={index}>{bullet}</li>
        }
    });

    return (
        <div>
            <h4 className={printStyles.topicSubhead + " " + (props.party === "Democrat" ? printStyles.democrat : printStyles.republican)}>Proposal on {props.topic.toLowerCase()}</h4>
            <ul className={printStyles.contentList}>
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
                <div className={printStyles.separator}><span className={printStyles.separatorLine}></span>Other proposals by {props.view === "Issue areas" ? "issue area" : "type of tax"}<span className={printStyles.separatorLine}></span></div>
                {remainingTopics}
            </div>
        )
    }

}

function PrintPage({ location }) {
    if(location.search.indexOf("?") === -1) {
        return (
            <div></div>
            )
    }
    else {
    const queryString = location.search.split("?")[1];
    const queryObj = parseQueryString(queryString);

    const candidateFirstName = cardData[queryObj.candidate]["First name"];
    const party = cardData[queryObj.candidate]["Party"];
    console.log(queryObj);
    return (
        <div className={printStyles.print}>
            <div className="header">
                <img src={logo} alt="TPC logo" style={{ width: 70 }} />
            </div>
            <div style={{ overflow: `auto` }}>
                <div className={printStyles.partyLogo + " " + (party === "Democrat" ? printStyles.democrat : printStyles.republican)}>{party === "Democrat" ? "D" : "R"}</div>
                <h1 className={printStyles.candidateName + " " + (party === "Democrat" ? printStyles.democrat : printStyles.republican)}>{candidateFirstName + " " + queryObj.candidate}</h1>
            </div>
            <ModalContent
                candidateLastName={queryObj.candidate}
                view={queryObj.view}
                topic={queryObj.topic}
                party={party}
            />
        </div>
    )
}
}

export default PrintPage
