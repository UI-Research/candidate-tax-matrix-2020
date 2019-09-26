import React from "react"
import cardStyles from "./cards.module.css"

function Cards(props) {
    const candidates = props.candidates;
    const candidateCards = candidates.map((candidate) =>
        <div key={candidate.split().join("_")} className={cardStyles.card}>{candidate}</div>
    );

    return (
        <div className={cardStyles.cardContainer}>{candidateCards}</div>
    );
}

export default Cards
