import React from "react"
import SelectAllButtons from "./select-all-buttons.js"
import issueListStyles from "./candidate-list.module.css"

function IssueList(props) {
    const issues = props.issues;
    const numIssuesSelected = issues.reduce((accumulator, currentValue) => accumulator + currentValue.selected, 0);
    const allIssueListItems = issues.map((issue, idx) =>
        <li key={issue.name}>
            <button
                className={issueListStyles.menuButton + " " + (issue.selected ? issueListStyles.selected : null) + " " + issueListStyles.democrat}
                onClick={() => props.onClick(issue.name)}
            >
                <span className={issueListStyles.buttonLabel}>{issue.name}</span>
                <span className={issueListStyles.selectedIcon}>{issue.selected ? "×" : "+" }</span>
            </button>
        </li>
    );

    return (
        <div>
            <button
                className={issueListStyles.openMenuButton}
                onClick={() => props.onMobileMenuBtnClick("Issue areas")}
            >
                Choose issue areas
                <span style={{
                   fontStyle: `normal`,
                   color: `#11719f`,
                   fontWeight: `bold`,
                   fontSize: 24,
                   position: `absolute`,
                   right: 10
                }}>+</span>
            </button>
            <div className={issueListStyles.filterButtonContainer + " " + (props.mobileIssuesMenuIsOpen ? issueListStyles.opened : "")}>
                 <button
                    className={issueListStyles.closeMenuButton}
                    onClick={() => props.onMobileMenuCloseBtnClick("Issue areas")}
                >
                    ×
                </button>
               <h4 className={issueListStyles.menuTitle}>Choose issue areas</h4>
                <SelectAllButtons
                    list="issue areas"
                    numItemsSelected={numIssuesSelected}
                    totalListLength={issues.length}
                    onSelectAllClick={props.onSelectAllClick}
                    onClearSelectionClick={props.onClearSelectionClick}
                />
                <ul className={issueListStyles.menuList}>{allIssueListItems}</ul>
            </div>
        </div>
    );
}

export default IssueList
