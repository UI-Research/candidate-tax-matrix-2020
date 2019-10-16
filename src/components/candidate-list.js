import React from "react"
import candidateListStyles from "./candidate-list.module.css"

function CandidateList(props) {
    const candidates = props.candidates;
    const allCandidateListItems = candidates.map((candidate, idx) =>
        <li key={candidate.id} onDragOver={() => props.onDragOver(idx)}>
            <button
                className={candidateListStyles.menuButton + " " + (candidate.selected ? candidateListStyles.selected : null)}
                onClick={() => props.onClick(candidate.id)}
                draggable
                onDragStart={(e) => props.onDragStart(e, idx)}
                onDragEnd={props.onDragEnd}
            >
                {candidate.first_name} {candidate.last_name}
            </button>
        </li>
    );

    return (
        <>
            <div>
                <h4>Choose candidates</h4>
                <button onClick={() => props.onSelectAllClick("candidates")}>Select all</button>
                /
                <button onClick={() => props.onClearSelectionClick("candidates")}>Clear selection</button>
            </div>
            <ul className={candidateListStyles.menuList}>{allCandidateListItems}</ul>
        </>
    );
}

export default CandidateList
