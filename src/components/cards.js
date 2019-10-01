import React from "react"
import cardStyles from "./cards.module.css"

function Card(props) {
    const candidate = props.candidate;
    return (
        <div className={cardStyles.card} onClick={() => props.onClick(candidate.name)}>{candidate.name}<br />{props.view}</div>
    )
}

function Cards(props) {
    const candidateCards = props.candidates.filter((candidate) => candidate.selected).map((candidate) =>
        <Card
            key={candidate.name}
            candidate={candidate}
            view={props.view}
            onClick={props.onClick}
        />
    );

    return (
        <div className={cardStyles.cardContainer}>{candidateCards}</div>
    )
}

export default Cards
