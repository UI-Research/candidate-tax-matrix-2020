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
            {candidate} <br />
            {props.view}
        </div>
    )
}

function Cards(props) {
    const view = props.view;
    const selectedCandidates = props.candidates.filter((candidate) => candidate.selected).map((candidate) => candidate.name);
    let allCards = selectedCandidates;

    if(view === "issue areas") {
        const selectedIssues = props.issues.filter((issue) => issue.selected).map((issue) => issue.name);
        allCards = cartProd(selectedCandidates, selectedIssues);
    }
    else if(view === "tax policies") {
        const selectedTaxPolicies = props.taxPolicies.filter((taxPolicy) => taxPolicy.selected).map((taxPolicy) => taxPolicy.name);
        allCards = cartProd(selectedCandidates, selectedTaxPolicies);
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
        <div className={cardStyles.cardContainer}>{candidateCards}</div>
    )
}

export default Cards
