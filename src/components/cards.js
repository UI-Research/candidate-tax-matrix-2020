import React  from "react"
import Card from "./card"
import cardStyles from "./cards.module.css"

function Cards(props) {
    const view = props.view;
    const candidates = props.candidates;
    const candidateCards = candidates.filter((candidate) => candidate.selected).map((candidate) =>
        <Card key={candidate.name} candidate={candidate} view={view} />
    );

    return (
        <div className={cardStyles.cardContainer}>{candidateCards}</div>
    );
}

export default Cards
