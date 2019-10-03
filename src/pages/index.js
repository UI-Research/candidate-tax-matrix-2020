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
        document.getElementsByTagName('html')[0].style["overflow-y"] = "hidden";  // in gatsby, need to set overflow of <html> to hidden to prevent scroll
        document.getElementsByTagName('body')[0].style["padding-right"] = "15px";
        this.setState({
            modalIsOpen: true,
            modalCandidate: candidate,
        });
    }

    handleModalCloseBtnClick = () => {
        // console.log("close modal");
        document.getElementsByTagName('html')[0].style["overflow-y"] = "scroll";
        document.getElementsByTagName('body')[0].style["padding-right"] = "0";
        this.setState({
            modalIsOpen: false,
            modalCandidate: null,
        });
    }

    onDragStart = (e, index) => {
        this.draggedItem = this.state.selectedCandidates[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    }

    onDragOver = (index) => {
        const draggedOverItem = this.state.selectedCandidates[index];

        if(this.draggedItem === draggedOverItem) {
            return;
        }

        let selectedCandidates = this.state.selectedCandidates.filter(candidate => candidate !== this.draggedItem);

        selectedCandidates.splice(index, 0, this.draggedItem);

        this.setState({ selectedCandidates});
    }

    onDragEnd = () => {
        this.draggedIdx = null;
    }

    render() {
        return (
            <div>
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
                        onDragStart={this.onDragStart}
                        onDragOver={this.onDragOver}
                        onDragEnd={this.onDragEnd}
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
