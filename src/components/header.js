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
      <div className={headerStyles.innerContainerDiv}>
          <h1 className={headerStyles.projectTitle}>
              {siteTitle}
          </h1>
          <p className={headerStyles.date}>
            Date XX, 2019
          </p>
          <p className={headerStyles.introParagraph}>
            What are the 2020 presidential candidates proposing to do about taxes? Our tracker breaks down their plans by the issues, tallies up the cost, and shows how much tax bills would change for households with high, average, and low incomes.
          </p>
      </div>
      <img src={headerImage} className={headerStyles.headerImage} alt="" />
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
