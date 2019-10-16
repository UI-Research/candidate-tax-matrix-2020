import React from "react"
import issueListStyles from "./issue-list.module.css"

function IssueList(props) {
    const issues = props.issues;
    const allIssueListItems = issues.map((issue, idx) =>
        <li key={issue.name}>
            <button
                className={issueListStyles.menuButton + " " + (issue.selected ? issueListStyles.selected : null)}
                onClick={() => props.onClick(issue.name)}
            >
                {issue.name}
            </button>
        </li>
    );

    return (
        <>
            <div>
                <h4>Choose issue areas</h4>
                <button onClick={() => props.onSelectAllClick("issue areas")}>Select all</button>
                /
                <button onClick={() => props.onClearSelectionClick("issue areas")}>Clear selection</button>
            </div>
            <ul className={issueListStyles.menuList}>{allIssueListItems}</ul>
        </>
    );
}

export default IssueList
