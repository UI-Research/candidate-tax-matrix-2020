import React from "react"

function CandidateList(props) {
    const candidates = props.candidates;
    const allCandidateListItems = candidates.map((candidate) =>
        <li key={candidate.name}>
            <button className={candidate.selected ? "selected" : ""} onClick={() => props.onClick(candidate.name)}>{candidate.name}</button>
        </li>
    );

    return (
        <ul>{allCandidateListItems}</ul>
    );
}

export default CandidateList
