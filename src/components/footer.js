import { Link } from "gatsby"
import React from "react"

const Footer = () => (
  <footer
    style={{
      background: `#696969`,
      width: `100%`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          Footer
        </Link>
      </h2>
    </div>
  </footer>
)

export default Footer
