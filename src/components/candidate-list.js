import React from "react"
import SelectAllButtons from "./select-all-buttons.js"
import candidateListStyles from "./candidate-list.module.css"

function CandidateList(props) {
    const candidates = props.candidates;
    const allCandidateListItems = candidates.map((candidate, idx) =>
        <li key={candidate.id} onDragOver={() => props.onDragOver(idx)}>
            <button
                className={candidateListStyles.menuButton + " " + candidateListStyles.moveable + " " + (candidate.selected ? candidateListStyles.selected : null) + " " + (candidate.party === "Democrat" ? candidateListStyles.democrat : candidateListStyles.republican)}
                onClick={() => props.onClick(candidate.id)}
                draggable
                onDragStart={(e) => props.onDragStart(e, idx)}
                onDragEnd={props.onDragEnd}
            >
                {candidate.first_name} {candidate.last_name} <span className={candidateListStyles.selectedIcon}>{candidate.selected ? "×" : "+" }</span>
            </button>
        </li>
    );

    return (
        <div>
            <h4 className={candidateListStyles.menuTitle}>Choose candidates</h4>
            <SelectAllButtons
                list="candidates"
                onSelectAllClick={props.onSelectAllClick}
                onClearSelectionClick={props.onClearSelectionClick}
            />
            <ul className={candidateListStyles.menuList}>{allCandidateListItems}</ul>
            <div dangerouslySetInnerHTML={{__html: '<a href="www.urban.org">First &middot; Second</a>'}} />
        </div>
    );
}

export default CandidateList
