import React from "react"
import taxPolicyListStyles from "./issue-list.module.css"

function TaxPolicyList(props) {
    const taxPolicies = props.taxPolicies;
    const allTaxPolicyListItems = taxPolicies.map((taxPolicy, idx) =>
        <li key={taxPolicy.node.name}>
            <button
                className={taxPolicyListStyles.menuButton + " " + (taxPolicy.node.selected ? taxPolicyListStyles.selected : null)}
                onClick={() => props.onClick(taxPolicy.node.name)}
            >
                {taxPolicy.node.name}
            </button>
        </li>
    );

    return (
        <ul className={taxPolicyListStyles.menuList}>{allTaxPolicyListItems}</ul>
    );
}

export default TaxPolicyList
