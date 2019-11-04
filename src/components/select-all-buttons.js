import React from "react"
import selectAllBtnStyles from "./select-all-buttons.module.css"

function SelectAllButtons(props) {
    return (
        <div style={{marginBotton: 20}}>
            <div
                className={selectAllBtnStyles.selectAllBtn + " " + (props.numItemsSelected === props.totalListLength ? selectAllBtnStyles.deselected : "")}
                onClick={() => props.onSelectAllClick(props.list)}
            >
                Select all
            </div>
            <span style={{padding: 10, fontWeight: `bold`}}>/</span>
            <div
                className={selectAllBtnStyles.selectAllBtn + " " + (props.numItemsSelected === 0 ? selectAllBtnStyles.deselected : "")}
                onClick={() => props.onClearSelectionClick(props.list)}
            >
                Clear selection
            </div>
        </div>
    );
}

export default SelectAllButtons
