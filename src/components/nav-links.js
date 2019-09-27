//import { Link } from "gatsby"
import React, { Component } from "react"
import navLinksStyles from "./nav-links.module.css"

const views = ["overview", "issue areas", "tax policies"];

const NavLink = props => {
    return (
        <div
            className={navLinksStyles.navLink + " " + (props.selectedView === props.viewName ? navLinksStyles.selected : "")}
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

class NavLinks extends Component {

    render() {
        const selectedView = this.props.selectedView;

        return (
            <div className={navLinksStyles.navLinkContainer}>
                <NavButtons
                    selectedView={selectedView}
                    views={views}
                    onClick={this.props.onClick}
                />
            </div>
        );
    }
}

export default NavLinks