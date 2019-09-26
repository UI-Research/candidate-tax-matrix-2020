import React from "react"
/* import { Link } from "gatsby" */

import Layout from "../components/layout"
import NavLinks from "../components/nav-links"
import CandidateList from "../components/candidate-list"
//import Image from "../components/image"
import SEO from "../components/seo"

const candidates = ["Candidate 1", "Candidate 2", "Candidate 3", "Candidate 4", "Candidate 5"];

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <NavLinks />
    <h1>Overview</h1>
    <CandidateList candidates={candidates} />
  </Layout>
)

export default IndexPage
