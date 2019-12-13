import React from "react"
import Masonry from 'react-masonry-css'
import cardStyles from "./cards.module.css"
import Card from "./card.js"

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
