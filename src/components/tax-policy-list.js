import React from "react"
import SelectAllButtons from "./select-all-buttons.js"
import taxPolicyListStyles from "./candidate-list.module.css"

function TaxPolicyList(props) {
    const listName = props.listName;
    const items = props.taxPolicies;
    const numItemsSelected = items.reduce((accumulator, currentValue) => accumulator + currentValue.selected, 0);
    const allListItems = items.map((item, idx) =>
        <li key={item.name}>
            <button
                className={taxPolicyListStyles.menuButton + " " + (item.selected ? taxPolicyListStyles.selected : null)}
                onClick={() => props.onClick(item.name)}
            >
                <span className={taxPolicyListStyles.buttonLabel}>{item.name}</span>
                <span className={taxPolicyListStyles.selectedIcon}>{item.selected ? "×" : "+" }</span>
            </button>
        </li>
    );

    return (
        <div>
            <button
                className={taxPolicyListStyles.openMenuButton}
                onClick={() => props.onMobileMenuBtnClick(listName)}
            >
                Choose {listName}
                <span style={{
                   fontStyle: `normal`,
                   color: `#11719f`,
                   fontWeight: `bold`,
                   fontSize: 24,
                   position: `absolute`,
                   right: 10
                }}>+</span>
            </button>
            <div className={taxPolicyListStyles.filterButtonContainer + " " + (props.mobileMenuIsOpen ? taxPolicyListStyles.opened : "")}>
                <button
                    className={taxPolicyListStyles.closeMenuButton}
                    onClick={() => props.onMobileMenuCloseBtnClick(listName)}
                >
                    ×
                </button>
                <h4 className={taxPolicyListStyles.menuTitle}>Choose {listName}</h4>
                <SelectAllButtons
                    list={listName}
                    numItemsSelected={numItemsSelected}
                    totalListLength={items.length}
                    onSelectAllClick={props.onSelectAllClick}
                    onClearSelectionClick={props.onClearSelectionClick}
                />
                <ul className={taxPolicyListStyles.menuList}>{allListItems}</ul>
                <button
                    className={taxPolicyListStyles.viewSelectionsButton}
                    onClick={() => props.onMobileMenuCloseBtnClick(listName)}
                >
                    View Selections
                </button>
            </div>
        </div>
    );
}

export default TaxPolicyList
