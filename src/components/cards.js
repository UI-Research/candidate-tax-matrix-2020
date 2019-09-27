import React from "react"
import cardStyles from "./cards.module.css"

function Cards(props) {
    const view = props.view;
    const candidates = props.candidates;
    const candidateCards = candidates.filter((candidate) => candidate.selected).map((candidate) =>
        <div key={candidate.name} className={cardStyles.card}>{candidate.name}<br />{view}</div>
    );

    return (
        <div className={cardStyles.cardContainer}>{candidateCards}</div>
    );
}

export default Cards
