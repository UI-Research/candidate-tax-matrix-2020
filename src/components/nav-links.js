//import { Link } from "gatsby"
import React from "react"
import navLinksStyles from "./nav-links.module.css"

const views = ["Overview", "Issue areas", "Tax policies"];

const NavLink = props => {
    return (
        <div
            className={navLinksStyles.navLink + " " + (props.selectedView === props.viewName ? navLinksStyles.selected : null)}
            onClick={() => props.onClick(props.viewName)}
        >
            {props.viewName}
        </div>
    );
}

const NavButtons = props => {
    const navButtons = props.views.map((view) => {
        return (
            <NavLink
                key={view}
                selectedView={props.selectedView}
                viewName={view}
                onClick={props.onClick}
            />
        )
    })

    return navButtons;
}

function NavLinks(props) {
    return (
        <div className={navLinksStyles.navLinkContainer}>
            <NavButtons
                selectedView={props.selectedView}
                views={views}
                onClick={props.onClick}
            />
        </div>
    );
}

export default NavLinks