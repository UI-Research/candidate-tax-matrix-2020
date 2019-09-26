import { Link } from "gatsby"
import React from "react"
import navLinksStyles from "./nav-links.module.css"

const NavLinks = () => (
  <navLinks
    style={{
    }}
  >
    <div className={navLinksStyles.navLinkContainer}>
        <Link to="/" className={navLinksStyles.navLink}>Overview</Link>
        <Link to="/issue-areas/" className={navLinksStyles.navLink}>Issue Areas</Link>
        <Link to="/tax-policies/" className={navLinksStyles.navLink}>Tax Policies</Link>
    </div>
  </navLinks>
)

export default NavLinks
