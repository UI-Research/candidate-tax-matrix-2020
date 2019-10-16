//import { Link } from "gatsby"
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
          About
      </h2>
      <p>This feature was funded by Arnold Ventures. We are grateful to them and to all our funders, who make it possible for the Tax Policy Center to advance its mission. The views expressed are those of the authors and should not be attributed to the Urban Institute, the Brookings Institution, their trustees, or their funders. Funders do not determine research findings or the insights and recommendations of Tax Policy Center experts. More information on the Tax Policy Center’s funding principles is available here. Read Urban’s terms of service here.</p>
      <h2>Project Credits</h2>
      <p>RESEARCH: Janet Holtzblatt and Nikhita Airi</p>
        <p>DESIGN: Allison Feldman</p>
        <p>DEVELOPMENT: Alice Feng</p>
        <p>EDITING: Michael Marazzi</p>
        <p>WRITING: Serena Lei</p>
        <p>View this project on GitHub</p>
    </div>
  </footer>
)

export default Footer
