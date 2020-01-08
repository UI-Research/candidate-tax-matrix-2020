import React from "react"
import SelectAllButtons from "./select-all-buttons.js"
import candidateListStyles from "./candidate-list.module.css"

function CandidateList(props) {
    const listName = props.listName;
    const items = props.items;
    const numItemsSelected = items.reduce((accumulator, currentValue) => accumulator + currentValue.selected, 0);
    const allListItems = items.map((item, idx) => {
        if(listName === "candidates") {
            return (
                <li key={item.id} onDragOver={() => props.onDragOver(idx)}>
                    <button
                        className={candidateListStyles.menuButton + " " + candidateListStyles.moveable + " " + (item.selected ? candidateListStyles.selected : "")}
                        onClick={() => props.onClick(item.id)}
                        draggable
                        onDragStart={(e) => props.onDragStart(e, idx)}
                        onDragEnd={props.onDragEnd}
                    >
                        {item.first_name} {item.last_name} ({item.party[0]}) {item.dropped_out === "Y" && "*"}
                        <span className={candidateListStyles.selectedIcon}>{item.selected ? "×" : "+" }</span>
                    </button>
                </li>
            )
        }
        else {
            return (
                <li key={item.name}>
                    <button
                        className={candidateListStyles.menuButton + " " + (item.selected ? candidateListStyles.selected : null)}
                        onClick={() => props.onClick(item.name)}
                    >
                        <span className={candidateListStyles.buttonLabel}>{item.name}</span>
                        <span className={candidateListStyles.selectedIcon}>{item.selected ? "×" : "+" }</span>
                    </button>
                </li>
            )
        }
    });

    return (
        <div>
            <button
                className={candidateListStyles.openMenuButton}
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
            <div className={candidateListStyles.filterButtonContainer + " " + (props.mobileMenuIsOpen ? candidateListStyles.opened : "")}>
                <button
                    className={candidateListStyles.closeMenuButton}
                    onClick={() => props.onMobileMenuCloseBtnClick(listName)}
                >
                    ×
                </button>
                <h4 className={candidateListStyles.menuTitle}>Choose {listName}</h4>
                <SelectAllButtons
                    list={listName}
                    numItemsSelected={numItemsSelected}
                    totalListLength={items.length}
                    onSelectAllClick={props.onSelectAllClick}
                    onClearSelectionClick={props.onClearSelectionClick}
                />
                <ul className={candidateListStyles.menuList}>{allListItems}</ul>
                {props.listName === "candidates" && <p className={candidateListStyles.note}>Asterisks denote candidates who have suspended their campaigns.</p>}
                <button
                    className={candidateListStyles.viewSelectionsButton}
                    onClick={() => props.onMobileMenuCloseBtnClick(listName)}
                >
                    View Selections
                </button>
            </div>
        </div>
    );
}

export default CandidateList
