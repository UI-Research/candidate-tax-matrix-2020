// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#164B7C`,
      marginBottom: `1.45rem`,
      width: `100%`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1226,
        height: 268,
        padding: `1.45rem 0`,
      }}
    >
      <h1
        style={{
            margin: 0,
            color: `white`,
            fontSize: 60,
            fontWeight: `bold`,
            textDecoration: `none`,
            marginTop: `1rem`
        }}
    >
          {siteTitle}
      </h1>
      <p style={{
        color: `#fff`,
        fontSize: 24,
        marginTop: `2rem`
      }}>
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
