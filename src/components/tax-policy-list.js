import React from "react"
import SelectAllButtons from "./select-all-buttons.js"
import taxPolicyListStyles from "./candidate-list.module.css"

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
        <div>
            <h4 className={taxPolicyListStyles.menuTitle}>Choose tax types</h4>
            <SelectAllButtons
                list="tax types"
                onSelectAllClick={props.onSelectAllClick}
                onClearSelectionClick={props.onClearSelectionClick}
            />
            <ul className={taxPolicyListStyles.menuList}>{allTaxPolicyListItems}</ul>
        </div>
    );
}

export default TaxPolicyList
