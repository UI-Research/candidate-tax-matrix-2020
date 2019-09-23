import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const TaxPolicies = () => (
  <Layout>
    <SEO title="Tax policies" />
    <h1>Tax Policies</h1>
    <p>Welcome to page 3</p>
    <Link to="/">Overview</Link>
    <Link to="/issue-areas/">Issue Areas</Link>
  </Layout>
)

export default TaxPolicies
