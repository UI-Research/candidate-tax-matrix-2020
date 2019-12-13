import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactMarkdown from 'react-markdown'
import logo from "../images/tpcLogo.png"
import cardData from "../data/data.json"
import printStyles from "./print.module.css"
import ModalContent from "../components/modal-content.js"

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

const cartProd = (arr1, arr2) =>
    arr2.flatMap(x => arr1.map(y => x + "|" + y));

function Card(props) {
    // console.log(cardData.filter((candidate) => candidate.Name === "Biden"));
    let candidateLastName = props.candidate;
    if(props.view !== "Overview") candidateLastName = props.candidate.split("|")[1];
    let candidateFirstName = cardData[candidateLastName]["First name"];
    let party = cardData[candidateLastName]["Party"];
    let cardTitle = "Overview";
    let cardBullets = cardData[candidateLastName]["Overview"];

    if(props.view === "Issue areas") {
        let issue = props.candidate.split("|")[0];
        cardTitle = issue;

        let cardText = cardData[candidateLastName]["Issue areas"][issue];

        cardBullets = cardText.map((bullet, index) => {
            if (bullet.indexOf("•") > -1) {
                const subbullets = bullet.split("•");
                const subbulletsList = subbullets.slice(1).map((subbullet, index) =>
                    <li key={index}><ReactMarkdown source={subbullet} linkTarget="_blank" className={printStyles.printLink} /></li>
                );

                return (
                    <li key={index}><ReactMarkdown source={subbullets[0]} linkTarget="_blank" className={printStyles.printLink} />
                        <ul>
                            {subbulletsList}
                        </ul>
                    </li>
                )
            }
            else {
                return <li key={index}><ReactMarkdown source={bullet} linkTarget="_blank" className={printStyles.printLink} /></li>
            }
        });
    }
    else if(props.view === "Tax types") {
        let taxType = props.candidate.split("|")[0];
        cardTitle = taxType;

        let cardText = cardData[candidateLastName]["Tax types"][taxType];

        cardBullets = cardText.map((bullet, index) => {
            if (bullet.indexOf("•") > -1) {
                const subbullets = bullet.split("•");
                const subbulletsList = subbullets.slice(1).map((subbullet, index) =>
                    <li key={index}><ReactMarkdown source={subbullet}  className={printStyles.printLink}  linkTarget="_blank" /></li>
                );

                return (
                    <li key={index}><ReactMarkdown source={subbullets[0]} className={printStyles.printLink}  linkTarget="_blank" />
                        <ul>
                            {subbulletsList}
                        </ul>
                    </li>
                )
            }
            else {
                return <li key={index}><ReactMarkdown source={bullet} className={printStyles.printLink}  linkTarget="_blank" /></li>
            }
        });
    }

    return (
        <div className={printStyles.card}>
            <h5 className={printStyles.cardTitle}>{cardTitle}</h5>
            <div style={{overflow: `auto`}}>
                <div className={printStyles.partyLogo + " " + (party === "Democratic" ? printStyles.democrat : printStyles.republican)}>{party === "Democratic" ? "D" : "R"}</div>
                <h3 className={printStyles.candidateName + " " + (party === "Democratic" ? printStyles.democrat : printStyles.republican)}>{candidateFirstName + " " + candidateLastName}</h3>
            </div>
            <h4 className={printStyles.topicSubhead + " " + (party === "Democratic" ? printStyles.democrat : printStyles.republican)}>Proposal</h4>
            {props.view === "Overview" && <p>{cardBullets}</p>}
            {props.view !== "Overview" && <ul className={printStyles.contentList}>
                {cardBullets}
            </ul> }
        </div>
    )
}

function PrintPage({ location }) {
    const data = useStaticQuery(graphql`
        query PrintSiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
  `)

    let printBody;

    if(location.search.indexOf("?") > -1) {
        const queryString = location.search.split("?")[1];
        const queryObj = parseQueryString(queryString);

        if(Object.keys(queryObj).indexOf("cards") > -1) {
            let candidates = queryObj["candidates"].split(",");
            let view = queryObj["view"];
            let topics = queryObj["topic"].split("-");

            let allCards = candidates;
            if(view !== "Overview") {
                allCards = cartProd(candidates, topics);
            }

            const candidateCards = allCards.map((candidate) =>
                <Card
                    key={candidate}
                    candidate={candidate}
                    view={view}
                />
            );

            printBody = <div>
                {candidateCards}
            </div>
        }
        else {
            const candidateFirstName = cardData[queryObj.candidate]["First name"];
            const party = cardData[queryObj.candidate]["Party"];
            // console.log(queryObj);

            printBody = <>
                <div style={{ overflow: `auto` }}>
                    <div className={printStyles.partyLogo + " " + (party === "Democratic" ? printStyles.democrat : printStyles.republican)}>{party === "Democratic" ? "D" : "R"}</div>
                    <h1 className={printStyles.candidateName + " " + (party === "Democratic" ? printStyles.democrat : printStyles.republican)}>{candidateFirstName + " " + queryObj.candidate}</h1>
                </div>
                <ModalContent
                    candidateLastName={queryObj.candidate}
                    view={queryObj.view}
                    topic={queryObj.topic}
                    party={party}
                    isPrint="true"
                />
            </>
        }
    }
    return (
        <div className={printStyles.print}>
            <div className="header">
                <img src={logo} alt="TPC logo" style={{ width: 70 }} />
                <h1 style={{fontSize: `12pt`}}>{data.site.siteMetadata.title}</h1>
                <p style={{fontSize: `12pt`, lineHeight: `16pt`}}>How would the 2020 presidential candidates change the tax code? We dig into the details of their latest proposals.</p>
            </div>
            {printBody}
        </div>
    )
}

export default PrintPage
