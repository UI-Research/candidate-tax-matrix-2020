import React from "react"
/* import { Link } from "gatsby" */

import Layout from "../components/layout"
import NavLinks from "../components/nav-links"
//import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    {/* <h1>2020 Candidate Tax Matrix</h1> */}
    <p>Overview</p>
    <NavLinks />
  </Layout>
)

export default IndexPage
