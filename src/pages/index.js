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

// function sortBySelection(obj1, obj2) {
//     // source: https://gomakethings.com/sorting-an-array-by-multiple-criteria-with-vanilla-javascript/
//     // sort selected items to appear at top
//     if(obj1.selected && !obj2.selected) return -1;
//     if(!obj1.selected && obj2.selected) return 1;

//     // for candidates array, sort by party next
//     if(Object.keys(obj1).indexOf("party") > -1) {
//         if(obj1.party > obj2.party) return -1;
//         if(obj1.party < obj2.party) return 1;

//         if(obj1.last_name > obj2.last_name) return 1;
//         if(obj1.last_name < obj2.last_name) return -1;
//     }

//     // then sort alphabetically by name
//     if(obj1.name > obj2.name) return 1;
//     if(obj1.name < obj2.name) return -1;
// }

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "Overview",
            selectedCandidates: this.props.data.allCandidatesJson.nodes,
            modalIsOpen: false,
            modalCandidate: null,
            selectedIssues: this.props.data.allIssueAreasJson.nodes,
            selectedTaxTypes: this.props.data.allTaxTypesJson.nodes,
            mobileCandidatesMenuIsOpen: false,
            mobileMenuIsOpen: false,
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
        // candidates.sort(sortBySelection);
        this.setState({selectedCandidates : candidates});
    }

    handleIssueClick = (clickedIssue) => {
        const issues = this.state.selectedIssues.slice();
        issues.forEach(function(issue) {
            if(issue.name === clickedIssue) issue.selected = !issue.selected;
        });
        // issues.sort(sortBySelection);
        this.setState({selectedIssues : issues});
    }

    handleTaxTypeClick = (clickedTaxType) => {
        const taxTypes = this.state.selectedTaxTypes.slice();
        taxTypes.forEach(function(taxType) {
            if(taxType.name === clickedTaxType) taxType.selected = !taxType.selected;
        });
        // taxTypes.sort(sortBySelection);
        this.setState({selectedTaxTypes : taxTypes});
    }

    handleSelectAllClick = (list) => {
        if(list === "candidates") {
            const candidates = this.state.selectedCandidates.slice();
            candidates.map(c => c.selected = true);
            // candidates.sort(sortBySelection);
            this.setState({selectedCandidates : candidates});
        }
        else if(list === "issue areas") {
            const issues = this.state.selectedIssues.slice();
            issues.map(i => i.selected = true);
            // issues.sort(sortBySelection);
            this.setState({selectedIssues : issues});
        }
        else if(list === "tax types") {
            const taxTypes = this.state.selectedTaxTypes.slice();
            taxTypes.map(tp => tp.selected = true);
            // taxTypes.sort(sortBySelection);
            this.setState({selectedTaxTypes : taxTypes});
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
        else if(list === "tax types") {
            const taxTypes = this.state.selectedTaxTypes.slice();
            taxTypes.map(tp => tp.selected = false);
            this.setState({selectedTaxTypes : taxTypes});
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

    handleMobileMenuBtnClick = (menu) => {
        if(menu === "Candidates") {
            this.setState({mobileCandidatesMenuIsOpen : true});
        }
        else if(menu === "issue areas" || menu === "tax types") {
            this.setState({mobileMenuIsOpen : true});
        }
    }

    handleMobileMenuCloseBtnClick = (menu) => {
        if(menu === "Candidates") {
            this.setState({mobileCandidatesMenuIsOpen : false});
        }
        else if(menu === "issue areas" || menu === "tax types") {
            this.setState({mobileMenuIsOpen : false});
        }
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
                    <div className="filterContainer">
                        {this.state.view === "Issue areas" && <TaxPolicyList
                                                                listName="issue areas"
                                                                taxPolicies={this.state.selectedIssues}
                                                                onSelectAllClick={this.handleSelectAllClick}
                                                                onClearSelectionClick={this.handleClearSelectionClick}
                                                                onClick={this.handleIssueClick}
                                                                mobileMenuIsOpen={this.state.mobileMenuIsOpen}
                                                                onMobileMenuBtnClick={this.handleMobileMenuBtnClick}
                                                                onMobileMenuCloseBtnClick={this.handleMobileMenuCloseBtnClick} />}
                        {this.state.view === "Tax types" && <TaxPolicyList
                                                                listName="tax types"
                                                                taxPolicies={this.state.selectedTaxTypes}
                                                                onSelectAllClick={this.handleSelectAllClick}
                                                                onClearSelectionClick={this.handleClearSelectionClick}
                                                                onClick={this.handleTaxTypeClick}
                                                                mobileMenuIsOpen={this.state.mobileMenuIsOpen}
                                                                onMobileMenuBtnClick={this.handleMobileMenuBtnClick}
                                                                onMobileMenuCloseBtnClick={this.handleMobileMenuCloseBtnClick} />}
                        <CandidateList
                            candidates={this.state.selectedCandidates}
                            onSelectAllClick={this.handleSelectAllClick}
                            onClearSelectionClick={this.handleClearSelectionClick}
                            onClick={this.handleCandidateClick}
                            onDragStart={this.onDragStart}
                            onDragOver={this.onDragOver}
                            onDragEnd={this.onDragEnd}
                            mobileCandidatesMenuIsOpen={this.state.mobileCandidatesMenuIsOpen}
                            onMobileMenuBtnClick={this.handleMobileMenuBtnClick}
                            onMobileMenuCloseBtnClick={this.handleMobileMenuCloseBtnClick}
                        />
                    </div>
                    <Cards
                        view={this.state.view}
                        candidates={this.state.selectedCandidates}
                        issues={this.state.selectedIssues}
                        taxPolicies={this.state.selectedTaxTypes}
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
      allCandidatesJson(sort: {fields: [party, last_name]}) {
        nodes {
          first_name
          id
          last_name
          party
          selected
        }
      }
      allTaxTypesJson(sort: {fields: name}) {
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