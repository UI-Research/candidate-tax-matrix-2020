//import { Link } from "gatsby"
import React from "react"
import navLinksStyles from "./nav-links.module.css"

function NavLinks(props) {
    const selectedView = props.selectedView;

    return (
        <div className={navLinksStyles.navLinkContainer}>
            <div className={navLinksStyles.navLink + " " + (selectedView === "overview" ? navLinksStyles.selected : "")}>Overview</div>
            <div className={navLinksStyles.navLink + " " + (selectedView === "issue areas" ? navLinksStyles.selected : "")}>Issue Areas</div>
            <div className={navLinksStyles.navLink + " " + (selectedView === "tax policies" ? navLinksStyles.selected : "")}>Tax Policies</div>
        </div>
    );
}

export default NavLinks
