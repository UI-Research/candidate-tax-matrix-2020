import React from "react"
import candidateListStyles from "./candidate-list.module.css"

function CandidateList(props) {
    const candidates = props.candidates;
    const allCandidateListItems = candidates.map((candidate, idx) =>
        <li key={candidate.node.id} onDragOver={() => props.onDragOver(idx)}>
            <button
                className={candidateListStyles.menuButton + " " + (candidate.node.selected ? candidateListStyles.selected : null)}
                onClick={() => props.onClick(candidate.node.id)}
                draggable
                onDragStart={(e) => props.onDragStart(e, idx)}
                onDragEnd={props.onDragEnd}
            >
                {candidate.node.first_name} {candidate.node.last_name}
            </button>
        </li>
    );

    return (
        <>
            <div>
                <button onClick={() => props.onSelectAllClick()}>Select all</button>
                /
                <button onClick={() => props.onClearSelectionClick()}> Clear selection</button>
            </div>
            <ul className={candidateListStyles.menuList}>{allCandidateListItems}</ul>
        </>
    );
}

export default CandidateList
