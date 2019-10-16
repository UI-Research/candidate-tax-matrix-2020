import React from "react"
import taxPolicyListStyles from "./issue-list.module.css"

function TaxPolicyList(props) {
    const taxPolicies = props.taxPolicies;
    const allTaxPolicyListItems = taxPolicies.map((taxPolicy, idx) =>
        <li key={taxPolicy.name}>
            <button
                className={taxPolicyListStyles.menuButton + " " + (taxPolicy.selected ? taxPolicyListStyles.selected : null)}
                onClick={() => props.onClick(taxPolicy.name)}
            >
                {taxPolicy.name}
            </button>
        </li>
    );

    return (
        <>
            <div>
                <h4>Choose tax policies</h4>
                <button onClick={() => props.onSelectAllClick("tax policies")}>Select all</button>
                /
                <button onClick={() => props.onClearSelectionClick("tax policies")}>Clear selection</button>
            </div>
            <ul className={taxPolicyListStyles.menuList}>{allTaxPolicyListItems}</ul>
        </>
    );
}

export default TaxPolicyList
