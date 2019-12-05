import React from "react"
import Masonry from 'react-masonry-css'
import ReactMarkdown from 'react-markdown';
import cardData from "../data/data.json"
import cardStyles from "./cards.module.css"

const breakpointColumnsObj = {
  default: 2,
  1094: 1
};

const cartProd = (arr1, arr2) =>
    arr2.flatMap(x => arr1.map(y => x + "|" + y));

const sanitizeString = (string) =>
    string.split(" ").join("_");

function buildQueryString(view, candidates, props) {
    let candidatesQueryString = (candidates.length > 0) && candidates[0];
    if(candidates.length > 1) {
        candidatesQueryString = candidates.slice(1).reduce((accumulator, currentValue) => accumulator + "," + currentValue, candidatesQueryString);
    }

    let topics = "overview";
    if(view === "Issue areas") {
        let issues = props.issues.filter((issue) => issue.selected).map((issue) => issue.name);
        topics = (issues.length > 0) && sanitizeString(issues[0]);
        topics = issues.slice(1).reduce((accumulator, currentValue) => accumulator + "-" + sanitizeString(currentValue), topics);
    }
    else if(view === "Tax types") {
        let taxTypes = props.taxPolicies.filter((taxPolicy) => taxPolicy.selected).map((taxPolicy) => taxPolicy.name);
        topics = (taxTypes.length > 0) && sanitizeString(taxTypes[0]);
        topics = taxTypes.slice(1).reduce((accumulator, currentValue) => accumulator + "-" + sanitizeString(currentValue), topics);
    }
    // console.log(candidatesQueryString);

    let queryString = `/print/?cards=true&view=${sanitizeString(view)}&candidates=${candidatesQueryString}&topic=${topics}`;

    return queryString;
}

function Card(props) {
    // console.log(cardData.filter((candidate) => candidate.Name === "Biden"));
    let candidateLastName = props.candidate;
    if(props.view !== "Overview") candidateLastName = props.candidate.split("|")[1];
    let candidateFirstName = cardData[candidateLastName]["First name"];
    let party = cardData[candidateLastName]["Party"];
    let cardTitle = "Overview";
    let viewMoreText = "View overview";
    let cardBullets = cardData[candidateLastName]["Overview"];

    if(props.view === "Issue areas") {
        viewMoreText = "View proposal by issue area";
        let issue = props.candidate.split("|")[0];
        cardTitle = issue;

        let cardText = cardData[candidateLastName]["Issue areas"][issue];

        cardBullets = cardText.map((bullet, index) => {
            if (bullet.indexOf("•") > -1) {
                const subbullets = bullet.split("•");
                const subbulletsList = subbullets.slice(1).map((subbullet, index) =>
                    <li key={index}><ReactMarkdown source={subbullet} linkTarget="_blank" /></li>
                );

                return (
                    <li key={index}><ReactMarkdown source={subbullets[0]} linkTarget="_blank" />
                        <ul>
                            {subbulletsList}
                        </ul>
                    </li>
                )
            }
            else {
                return <li key={index}><ReactMarkdown source={bullet} linkTarget="_blank" /></li>
            }
        });
    }
    else if(props.view === "Tax types") {
        viewMoreText = "View proposal by tax type";
        let taxType = props.candidate.split("|")[0];
        cardTitle = taxType;

        let cardText = cardData[candidateLastName]["Tax types"][taxType];

        cardBullets = cardText.map((bullet, index) => {
            if (bullet.indexOf("•") > -1) {
                const subbullets = bullet.split("•");
                const subbulletsList = subbullets.slice(1).map((subbullet, index) =>
                    <li key={index}><ReactMarkdown source={subbullet} linkTarget="_blank" /></li>
                );

                return (
                    <li key={index}><ReactMarkdown source={subbullets[0]} linkTarget="_blank" />
                        <ul>
                            {subbulletsList}
                        </ul>
                    </li>
                )
            }
            else {
                return <li key={index}><ReactMarkdown source={bullet} linkTarget="_blank" /></li>
            }
        });
    }

    return (
        <div className={cardStyles.card}>
            <h5 className={cardStyles.cardTitle}>{cardTitle}</h5>
            <div style={{overflow: `auto`}}>
                <div className={cardStyles.partyLogo + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican)}>{party === "Democratic" ? "D" : "R"}</div>
                <h3 className={cardStyles.candidateName + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican)}>{candidateFirstName + " " + candidateLastName}</h3>
            </div>
            <h4 className={cardStyles.sectionTitle + " " + (party === "Democratic" ? cardStyles.democrat : cardStyles.republican)}>{props.view === "Overview" ? "Overview of tax proposals" : "Proposal"}</h4>
            {props.view === "Overview" && <p style={{marginBottom: 0}}>{cardBullets}</p>}
            {props.view !== "Overview" && <ul className={cardStyles.contentList}>
                                            {cardBullets}
                                        </ul>
            }
            {props.view !== "Overview" && <p
                                            className={cardStyles.viewMoreLink}
                                            onClick={() => props.onClick(props.candidate)}
                                        >
                                            {viewMoreText}
                                        </p>
            }
        </div>
    )
}

function Cards(props) {
    const view = props.view;
    const selectedCandidates = props.candidates.filter((candidate) => candidate.selected).map((candidate) => candidate.last_name);
    let allCards = selectedCandidates;

    const allCandidatesSelected = (selectedCandidates.length === props.candidates.length);
    let aboveCardText = "Showing " + (allCandidatesSelected ? "all" : "selected") + " candidates’ overviews";

    if(view === "Issue areas") {
        const selectedIssues = props.issues.filter((issue) => issue.selected).map((issue) => issue.name);
        allCards = cartProd(selectedCandidates, selectedIssues);
        aboveCardText = "Showing " + (allCandidatesSelected ? "all" : "selected") + " candidates and " + (selectedIssues.length === props.issues.length ? "all" : "selected") + " issue areas";
    }
    else if(view === "Tax types") {
        const selectedTaxPolicies = props.taxPolicies.filter((taxPolicy) => taxPolicy.selected).map((taxPolicy) => taxPolicy.name);
        allCards = cartProd(selectedCandidates, selectedTaxPolicies);
        aboveCardText = "Showing " + (allCandidatesSelected ? "all" : "selected") + " candidates and " + (selectedTaxPolicies.length === props.taxPolicies.length ? "all" : "selected") + " tax policies";
    }

    // console.log(allCards);
    const candidateCards = allCards.map((candidate) =>
        <Card
            key={candidate}
            candidate={candidate}
            view={view}
            onClick={props.onClick}
        />
    );

    const queryString = buildQueryString(view, selectedCandidates, props);

    return (
        <div className={cardStyles.cardContainer}>
            <div style={{fontSize: 16, fontWeight: `bold`}}>{aboveCardText}</div>
            <div>
                <a href={queryString} state={{candidates: props.candidates}} target="_blank" rel="noopener noreferrer" className={cardStyles.printLink}>
                    Print this view
                </a>
            </div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={cardStyles.myMasonryGrid}
                columnClassName={cardStyles.myMasonryGridColumn}>
                {candidateCards}
            </Masonry>
        </div>
    )
}

export default Cards
