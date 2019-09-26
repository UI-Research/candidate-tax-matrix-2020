import React from "react"

function CandidateList(props) {
    const candidates = props.candidates;
    const allCandidateListItems = candidates.map((candidate) =>
        <li key={candidate.split().join("_")}>{candidate}</li>
    );

    return (
        <ul>{allCandidateListItems}</ul>
    );
}

export default CandidateList
