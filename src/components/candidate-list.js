import React from "react"
import SelectAllButtons from "./select-all-buttons.js"
import candidateListStyles from "./candidate-list.module.css"

function CandidateList(props) {
    const candidates = props.candidates;
    const allCandidateListItems = candidates.map((candidate, idx) =>
        <li key={candidate.id} onDragOver={() => props.onDragOver(idx)}>
            <button
                className={candidateListStyles.btn + " " + candidateListStyles.menuButton + " " + (candidate.selected ? candidateListStyles.selected : null)}
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
            <div style={{maxWidth: 300}}>
                <h4
                    style={{
                        fontSize: 24,
                        fontWeight: `bold`,
                        marginBottom: `1rem`
                     }}
                >
                    Choose candidates
                </h4>
                <SelectAllButtons
                    list="candidates"
                    onSelectAllClick={props.onSelectAllClick}
                    onClearSelectionClick={props.onClearSelectionClick}
                />
            </div>
            <ul className={candidateListStyles.menuList}>{allCandidateListItems}</ul>
        </>
    );
}

export default CandidateList
