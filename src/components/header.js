// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import TpcHeader from "./tpc-header"
import headerStyles from "./header.module.css"

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
      <h1 className={headerStyles.projectTitle}>
          {siteTitle}
      </h1>
      <p className={headerStyles.date}>
        Date XX, 2019
      </p>
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
