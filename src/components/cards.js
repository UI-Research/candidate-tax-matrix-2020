import React from "react"
import cardStyles from "./cards.module.css"

const cartProd = (arr1, arr2) =>
    arr1.flatMap(x => arr2.map(y => [x, y]));

function Card(props) {
    const candidate = props.candidate;

    return (
        <div
            className={cardStyles.card}
            onClick={() => props.onClick(candidate)}
        >
            <h5 className={cardStyles.cardTitle}>{props.view}</h5>
            <div style={{overflow: `auto`}}>
                <div className={cardStyles.partyLogo}></div>
                <h3 className={cardStyles.candidateName}>{candidate}</h3>
            </div>
            <p className={cardStyles.viewMoreLink}>View overview</p>
        </div>
    )
}

function Cards(props) {
    const view = props.view;
    const selectedCandidates = props.candidates.filter((candidate) => candidate.selected).map((candidate) => candidate.first_name + " " + candidate.last_name);
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
        <div
            style={{
                maxWidth: 811,
                display: `inline-block`,
                float: `left`
            }}
        >
            <div style={{fontSize: 16, fontWeight: `bold`}}>{aboveCardText}</div>
            <div style={{fontSize: 16, fontWeight: `bold`, textDecoration: `underline`}}>Print this view</div>
            <div className={cardStyles.cardContainer}>{candidateCards}</div>
        </div>
    )
}

export default Cards
