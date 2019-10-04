import React from "react"
// import candidateListStyles from "./candidate-list.module.css"

function IssueList(props) {
    const issues = props.issues;
    const allIssueListItems = issues.map((issue, idx) =>
        <li key={issue.name}>
            <button
                // className={candidateListStyles.menuButton + " " + (candidate.selected ? candidateListStyles.selected : null)}
                // onClick={() => props.onClick(candidate.name)}
            >
                {issue.name}
            </button>
        </li>
    );

    return (
        <ul>{allIssueListItems}</ul>
    );
}

export default IssueList
