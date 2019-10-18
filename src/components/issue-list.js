import React from "react"
import SelectAllButtons from "./select-all-buttons.js"
import issueListStyles from "./candidate-list.module.css"

function IssueList(props) {
    const issues = props.issues;
    const allIssueListItems = issues.map((issue, idx) =>
        <li key={issue.name}>
            <button
                className={issueListStyles.menuButton + " " + (issue.selected ? issueListStyles.selected : null) + " " + issueListStyles.democrat}
                onClick={() => props.onClick(issue.name)}
            >
                {issue.name}
                <span className={issueListStyles.selectedIcon}>{issue.selected ? "×" : "+" }</span>
            </button>
        </li>
    );

    return (
        <div>
            <h4 className={issueListStyles.menuTitle}>Choose issue areas</h4>
            <SelectAllButtons
                list="issue areas"
                onSelectAllClick={props.onSelectAllClick}
                onClearSelectionClick={props.onClearSelectionClick}
            />
            <ul className={issueListStyles.menuList}>{allIssueListItems}</ul>
        </div>
    );
}

export default IssueList
