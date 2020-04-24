// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import TpcHeader from "./tpc-header"
import headerStyles from "./header.module.css"
import headerImage from "../images/2020-matrix-header.png"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#164B7C`,
      marginBottom: `1.45rem`,
      width: `100%`,
    }}
  >
    <TpcHeader />
    <div className={headerStyles.headerContainerDiv}>
      <img src={headerImage} className={headerStyles.headerImage} alt="" />
      <div className={headerStyles.innerContainerDiv}>
          <h1 className={headerStyles.projectTitle}>
              {siteTitle}
          </h1>
          <p className={headerStyles.date}>
            Updated April 24, 2020
          </p>
          <p className={headerStyles.introParagraph}>
            How would the 2020 presidential candidates change the tax code? We dig into the details of their latest proposals.
          </p>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
