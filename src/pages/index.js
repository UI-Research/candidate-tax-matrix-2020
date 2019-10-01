import React, { Component } from "react"
/* import { Link } from "gatsby" */

import Layout from "../components/layout"
import NavLinks from "../components/nav-links"
import CandidateList from "../components/candidate-list"
import Cards from "../components/cards"
import Modal from "../components/modal"
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
            modalIsOpen: false,
            modalCandidate: null,
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

    handleCardClick = (candidate) => {
        // console.log("open modal!", candidate, this.state.view);
        this.setState({
            modalIsOpen: true,
            modalCandidate: candidate,
        });
    }

    handleModalCloseBtnClick = () => {
        // console.log("close modal");
        this.setState({
            modalIsOpen: false,
            modalCandidate: null,
        });
    }

    render() {
        return (
            <div className={this.state.modalIsOpen ? "modalOpen" : null}>
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
                        onClick={this.handleCardClick}
                    />
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        view={this.state.view}
                        candidate={this.state.modalCandidate}
                        onClick={this.handleModalCloseBtnClick}
                    />
                </Layout>
            </div>
        )
    }
}

export default IndexPage
