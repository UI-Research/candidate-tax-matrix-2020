import React, { Component } from "react"
/* import { Link } from "gatsby" */

import Layout from "../components/layout"
import NavLinks from "../components/nav-links"
import CandidateList from "../components/candidate-list"
import Cards from "../components/cards"
//import Image from "../components/image"
import SEO from "../components/seo"

let candidates = [
                    {name: "Candidate 1", selected: true},
                    {name: "Candidate 2", selected: true},
                    {name: "Candidate 3", selected: true},
                    {name: "Candidate 4", selected: true},
                    {name: "Candidate 5", selected: true}
                ];

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "overview",
            selectedCandidates: candidates,
        };
    }

    handleViewClick = (view) => {
        this.setState({view: view});
    }

    handleCandidateClick = (clickedCandidate) => {
        // const candidates = this.state.selectedCandidates.filter(candidate => candidate.name !== clickedCandidate);
        const candidates = this.state.selectedCandidates.slice();
        candidates.forEach(function(candidate) {
            if(candidate.name === clickedCandidate) candidate.selected = !candidate.selected;
        });
        this.setState({selectedCandidates : candidates});
    }

    render() {
        return (
          <Layout>
            <SEO title="Home" />
            <NavLinks
                selectedView={this.state.view}
                onClick={this.handleViewClick}
            />
            <h1>Overview</h1>
            <CandidateList
                candidates={this.state.selectedCandidates}
                onClick={this.handleCandidateClick}
            />
            <Cards
                view={this.state.view}
                candidates={this.state.selectedCandidates}
            />
          </Layout>
        )
    }
}

export default IndexPage
