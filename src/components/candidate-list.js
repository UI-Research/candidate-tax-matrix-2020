import React from "react"
import candidateListStyles from "./candidate-list.module.css"

function CandidateList(props) {
    const candidates = props.candidates;
    const allCandidateListItems = candidates.map((candidate, idx) =>
        <li key={candidate.name} onDragOver={() => props.onDragOver(idx)}>
            <button
                className={candidateListStyles.menuButton + " " + (candidate.selected ? candidateListStyles.selected : null)}
                onClick={() => props.onClick(candidate.name)}
                draggable
                onDragStart={(e) => props.onDragStart(e, idx)}
                onDragEnd={props.onDragEnd}
            >
                {candidate.name}
            </button>
        </li>
    );

    return (
        <ul className={candidateListStyles.menuList}>{allCandidateListItems}</ul>
    );
}

export default CandidateList
