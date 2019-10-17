import React from "react"
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
                <div style={{marginBottom: 20}}>
                    <button
                        className={candidateListStyles.btn + " " + candidateListStyles.selectAllBtn}
                        onClick={() => props.onSelectAllClick("candidates")}
                    >
                        Select all
                    </button>
                    <span style={{padding: 10, fontWeight: `bold`}}>/</span>
                    <button
                        className={candidateListStyles.btn + " " + candidateListStyles.selectAllBtn}
                        onClick={() => props.onClearSelectionClick("candidates")}
                    >
                        Clear selection
                    </button>
                </div>
            </div>
            <ul className={candidateListStyles.menuList}>{allCandidateListItems}</ul>
        </>
    );
}

export default CandidateList
