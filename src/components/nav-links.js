//import { Link } from "gatsby"
import React, { Component } from "react"
import navLinksStyles from "./nav-links.module.css"

class NavLinks extends Component {

    render() {
        const selectedView = this.props.selectedView;

        return (
            <div className={navLinksStyles.navLinkContainer}>
                <div
                    className={navLinksStyles.navLink + " " + (selectedView === "overview" ? navLinksStyles.selected : "")}
                    onClick={() => this.props.onClick("overview")}
                >
                    Overview
                </div>
                <div
                    className={navLinksStyles.navLink + " " + (selectedView === "issue areas" ? navLinksStyles.selected : "")}
                    onClick={() => this.props.onClick("issue areas")}
                >
                    Issue Areas
                </div>
                <div
                    className={navLinksStyles.navLink + " " + (selectedView === "tax policies" ? navLinksStyles.selected : "")}
                    onClick={() => this.props.onClick("tax policies")}
                >
                    Tax Policies
                </div>
            </div>
        );
    }
}

export default NavLinks
