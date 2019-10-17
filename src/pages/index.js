import React, { Component } from "react"
import { graphql } from "gatsby"
/* import { Link } from "gatsby" */

import Layout from "../components/layout"
import NavLinks from "../components/nav-links"
import IssueList from "../components/issue-list"
import TaxPolicyList from "../components/tax-policy-list"
import CandidateList from "../components/candidate-list"
import Cards from "../components/cards"
import Modal from "../components/modal"
//import Image from "../components/image"
import SEO from "../components/seo"

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "Overview",
            selectedCandidates: this.props.data.allCandidatesJson.nodes,
            modalIsOpen: false,
            modalCandidate: null,
            selectedIssues: this.props.data.allIssueAreasJson.nodes,
            selectedTaxPolicies: this.props.data.allTaxPoliciesJson.nodes,
        };
    }

    handleViewClick = (view) => {
        this.setState({view: view});
    }

    handleCandidateClick = (clickedCandidate) => {
        // const candidates = this.state.selectedCandidates.filter(candidate => candidate.name !== clickedCandidate);
        const candidates = this.state.selectedCandidates.slice();
        candidates.forEach(function(candidate) {
            if(candidate.id === clickedCandidate) candidate.selected = !candidate.selected;
        });
        this.setState({selectedCandidates : candidates});
    }

    handleIssueClick = (clickedIssue) => {
        const issues = this.state.selectedIssues.slice();
        issues.forEach(function(issue) {
            if(issue.name === clickedIssue) issue.selected = !issue.selected;
        });
        this.setState({selectedIssues : issues});
    }

    handleTaxPolicyClick = (clickedTaxPolicy) => {
        const taxPolicies = this.state.selectedTaxPolicies.slice();
        taxPolicies.forEach(function(taxPolicy) {
            if(taxPolicy.name === clickedTaxPolicy) taxPolicy.selected = !taxPolicy.selected;
        });
        this.setState({selectedTaxPolicies : taxPolicies});
    }

    handleSelectAllClick = (list) => {
        if(list === "candidates") {
            const candidates = this.state.selectedCandidates.slice();
            candidates.map(c => c.selected = true);
            this.setState({selectedCandidates : candidates});
        }
        else if(list === "issue areas") {
            const issues = this.state.selectedIssues.slice();
            issues.map(i => i.selected = true);
            this.setState({selectedIssues : issues});
        }
        else if(list === "tax policies") {
            const taxPolicies = this.state.selectedTaxPolicies.slice();
            taxPolicies.map(tp => tp.selected = true);
            this.setState({selectedTaxPolicies : taxPolicies});
        }
    }

    handleClearSelectionClick = (list) => {
        if(list === "candidates") {
            const candidates = this.state.selectedCandidates.slice();
            candidates.map(c => c.selected = false);
            this.setState({selectedCandidates : candidates});
        }
        else if(list === "issue areas") {
            const issues = this.state.selectedIssues.slice();
            issues.map(i => i.selected = false);
            this.setState({selectedIssues : issues});
        }
        else if(list === "tax policies") {
            const taxPolicies = this.state.selectedTaxPolicies.slice();
            taxPolicies.map(tp => tp.selected = false);
            this.setState({selectedTaxPolicies : taxPolicies});
        }
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

    // code from: https://www.freecodecamp.org/news/how-to-make-and-test-your-own-react-drag-and-drop-list-with-0-dependencies-6fb461603780/
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
        // console.log(this.props.data.allCandidatesJson.nodes);
        return (
            <div>
                <Layout>
                    <SEO title="Home" />
                    <NavLinks
                        selectedView={this.state.view}
                        onClick={this.handleViewClick}
                    />
                    <div style={{
                        maxWidth: 375,
                        display: `inline-block`,
                        float: `left`
                    }}>
                        {this.state.view === "Issue areas" && <IssueList
                                                                issues={this.state.selectedIssues}
                                                                onSelectAllClick={this.handleSelectAllClick}
                                                                onClearSelectionClick={this.handleClearSelectionClick}
                                                                onClick={this.handleIssueClick} />}
                        {this.state.view === "Tax policies" && <TaxPolicyList
                                                                taxPolicies={this.state.selectedTaxPolicies}
                                                                onSelectAllClick={this.handleSelectAllClick}
                                                                onClearSelectionClick={this.handleClearSelectionClick}
                                                                onClick={this.handleTaxPolicyClick} />}
                        <CandidateList
                            candidates={this.state.selectedCandidates}
                            onSelectAllClick={this.handleSelectAllClick}
                            onClearSelectionClick={this.handleClearSelectionClick}
                            onClick={this.handleCandidateClick}
                            onDragStart={this.onDragStart}
                            onDragOver={this.onDragOver}
                            onDragEnd={this.onDragEnd}
                        />
                    </div>
                    <Cards
                        view={this.state.view}
                        candidates={this.state.selectedCandidates}
                        issues={this.state.selectedIssues}
                        taxPolicies={this.state.selectedTaxPolicies}
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
export const query = graphql`
    query getCandidatesQuery {
      allCandidatesJson(sort: {fields: [party, last_name], order: [DESC, ASC]}) {
        nodes {
          first_name
          id
          last_name
          party
          selected
        }
      }
      allTaxPoliciesJson(sort: {fields: name}) {
        nodes {
          id
          name
          selected
        }
      }
      allIssueAreasJson {
        nodes {
          id
          name
          selected
        }
  }
    }
`