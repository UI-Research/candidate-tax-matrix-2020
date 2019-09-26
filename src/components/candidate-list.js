import React from "react"

function CandidateList(props) {
    const candidates = props.candidates;
    const allCandidateListItems = candidates.map((candidate) =>
        <li>{candidate}</li>
    );

    return (
        <ul>{allCandidateListItems}</ul>
    );
}

export default CandidateList
