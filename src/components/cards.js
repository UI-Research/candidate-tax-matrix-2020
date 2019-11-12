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
    arr1.flatMap(x => arr2.map(y => x + "|" + y));

// const makeLink = (text) => {
//     const textRe = /\[.+\]/;
//     const linkRe = /\{.+\}/;
//     const re = /\[.+\]\{.+\}/;

//     if(text.indexOf("http") > -1) {
//         if(re.exec(text) !== null) {
//             const textToBeLinked = textRe.exec(text)[0];
//             const hyperlink = linkRe.exec(text)[0];
//             console.log(textToBeLinked, hyperlink);
//         }
//     }

//     return text;
// }

function Card(props) {
    // console.log(cardData.filter((candidate) => candidate.Name === "Biden"));
    let candidateLastName = props.candidate.split("|")[0];
    let candidateFirstName = cardData[candidateLastName]["First name"];
    let party = cardData[candidateLastName]["Party"];
    let cardTitle = "Overview";
    let viewMoreText = "View overview";
    let cardBullets;

    if(props.view === "Issue areas") {
        viewMoreText = "View proposal by issue area";
        let issue = props.candidate.split("|")[1];
        cardTitle = issue;

        let cardText = cardData[candidateLastName]["Issue areas"][issue];

        cardBullets = cardText.map((bullet, index) => {
            if (bullet.indexOf("•") > -1) {
                const subbullets = bullet.split("•");
                const subbulletsList = subbullets.slice(0).map((subbullet, index) =>
                    <li key={index}><ReactMarkdown source={subbullet} linkTarget="_blank" /></li>
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
                return <li key={index}><ReactMarkdown source={bullet} linkTarget="_blank" /></li>
            }
        });
    }
    else if(props.view === "Tax types") {
        viewMoreText = "View proposal by tax type";
        let taxType = props.candidate.split("|")[1];
        cardTitle = taxType;

        let cardText = cardData[candidateLastName]["Tax types"][taxType];

        cardBullets = cardText.map((bullet, index) => {
            if (bullet.indexOf("•") > -1) {
                const subbullets = bullet.split("•");
                const subbulletsList = subbullets.slice(0).map((subbullet, index) =>
                    <li key={index}><ReactMarkdown source={subbullet} linkTarget="_blank" /></li>
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
                return <li key={index}><ReactMarkdown source={bullet} linkTarget="_blank" /></li>
            }
        });
    }

    return (
        <div className={cardStyles.card}>
            <h5 className={cardStyles.cardTitle}>{cardTitle}</h5>
            <div style={{overflow: `auto`}}>
                <div className={cardStyles.partyLogo + " " + (party === "Democrat" ? cardStyles.democrat : cardStyles.republican)}>{party === "Democrat" ? "D" : "R"}</div>
                <h3 className={cardStyles.candidateName + " " + (party === "Democrat" ? cardStyles.democrat : cardStyles.republican)}>{candidateFirstName + " " + candidateLastName}</h3>
            </div>
            <h4 className={cardStyles.sectionTitle + " " + (party === "Democrat" ? cardStyles.democrat : cardStyles.republican)}>Proposal</h4>
            <ul className={cardStyles.contentList}>
                {cardBullets}
            </ul>
            <p
                className={cardStyles.viewMoreLink}
                onClick={() => props.onClick(props.candidate)}
            >
                {viewMoreText}
            </p>
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

    return (
        <div className={cardStyles.cardContainer}>
            <div style={{fontSize: 16, fontWeight: `bold`}}>{aboveCardText}</div>
            <div className={cardStyles.printLink}>Print this view</div>
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
