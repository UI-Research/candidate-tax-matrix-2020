import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IssueAreas = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Issue Areas</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Overview</Link>
    <Link to="/tax-policies/">Tax Policies</Link>
  </Layout>
)

export default IssueAreas
