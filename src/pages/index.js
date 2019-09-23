import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    {/* <h1>2020 Candidate Tax Matrix</h1> */}
    <p>Welcome to your new Gatsby site.</p>
    <Link to="/issue-areas/">Issue Areas</Link>
    <Link to="/tax-policies/">Tax Policies</Link>
  </Layout>
)

export default IndexPage
