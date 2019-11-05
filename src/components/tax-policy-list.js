import React from "react"
import SelectAllButtons from "./select-all-buttons.js"
import taxPolicyListStyles from "./candidate-list.module.css"

function TaxPolicyList(props) {
    const taxPolicies = props.taxPolicies;
    const numPoliciesSelected = taxPolicies.reduce((accumulator, currentValue) => accumulator + currentValue.selected, 0);
    const allTaxPolicyListItems = taxPolicies.map((taxPolicy, idx) =>
        <li key={taxPolicy.name}>
            <button
                className={taxPolicyListStyles.menuButton + " " + (taxPolicy.selected ? taxPolicyListStyles.selected : null) + " " + taxPolicyListStyles.democrat}
                onClick={() => props.onClick(taxPolicy.name)}
            >
                <span className={taxPolicyListStyles.buttonLabel}>{taxPolicy.name}</span>
                <span className={taxPolicyListStyles.selectedIcon}>{taxPolicy.selected ? "×" : "+" }</span>
            </button>
        </li>
    );

    return (
        <div>
            <button
                className={taxPolicyListStyles.openMenuButton}
                onClick={() => props.onMobileMenuBtnClick("Tax types")}
            >
                Choose tax types
                <span style={{
                   fontStyle: `normal`,
                   color: `#11719f`,
                   fontWeight: `bold`,
                   fontSize: 24,
                   position: `absolute`,
                   right: 10
                }}>+</span>
            </button>
            <div className={taxPolicyListStyles.filterButtonContainer + " " + (props.mobileTaxTypesMenuIsOpen ? taxPolicyListStyles.opened : "")}>
                <button
                    className={taxPolicyListStyles.closeMenuButton}
                    onClick={() => props.onMobileMenuCloseBtnClick("Tax types")}
                >
                    ×
                </button>
                <h4 className={taxPolicyListStyles.menuTitle}>Choose tax types</h4>
                <SelectAllButtons
                    list="tax types"
                    numItemsSelected={numPoliciesSelected}
                    totalListLength={taxPolicies.length}
                    onSelectAllClick={props.onSelectAllClick}
                    onClearSelectionClick={props.onClearSelectionClick}
                />
                <ul className={taxPolicyListStyles.menuList}>{allTaxPolicyListItems}</ul>
            </div>
        </div>
    );
}

export default TaxPolicyList
