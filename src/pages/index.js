import React, { Component } from "react"
/* import { Link } from "gatsby" */

import Layout from "../components/layout"
import NavLinks from "../components/nav-links"
import CandidateList from "../components/candidate-list"
import Cards from "../components/cards"
//import Image from "../components/image"
import SEO from "../components/seo"

const candidates = ["Candidate 1", "Candidate 2", "Candidate 3", "Candidate 4", "Candidate 5"];

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "overview",
            selectedCandidates: candidates,
        };
    }

    render() {
        const { view, selectedCandidates } = this.state;
        return (
          <Layout>
            <SEO title="Home" />
            <NavLinks selectedView={view} />
            <h1>Overview</h1>
            <CandidateList candidates={selectedCandidates} />
            <Cards candidates={selectedCandidates} />
          </Layout>
        )
    }
}

export default IndexPage
