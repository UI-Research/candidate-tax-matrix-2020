import React from "react"
import candidateListStyles from "./candidate-list.module.css"

function CandidateList(props) {
    const candidates = props.candidates;
    const allCandidateListItems = candidates.map((candidate) =>
        <li key={candidate.name}>
            <button
                className={candidateListStyles.menuButton + " " + (candidate.selected ? candidateListStyles.selected : null)}
                onClick={() => props.onClick(candidate.name)}
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
