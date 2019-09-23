import { Link } from "gatsby"
import React from "react"

const Header = () => (
  <header
    style={{
      background: `#333333`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          Header
        </Link>
      </h1>
      <h2 style={{ color: `#fff`}}>
        2020 Candidate Tax Matrix
      </h2>
    </div>
  </header>
)

export default Header
