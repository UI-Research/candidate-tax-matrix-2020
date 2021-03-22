import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import logo from "../images/tpcLogo.png"
import cardData from "../data/data.json"
import printStyles from "./print.module.css"
import ModalContent from "../components/modal-content.js"
import Card from "../components/card.js"

const unsanitizeString = (string) =>
    string.split("_").join(" ");

const parseQueryString = (queryString) => {
    let queryObj = {}
    queryString.split("&").forEach(p => {
        let field = p.split("=")[0];
        let value = unsanitizeString(p.split("=")[1]);
        queryObj[field] = value;
    })

    return queryObj;
}

const cartProd = (arr1, arr2) =>
    arr2.flatMap(x => arr1.map(y => x + "|" + y));

function PrintPage({ location }) {
    const data = useStaticQuery(graphql`
        query PrintSiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
  `)

    let printBody;

    if(location.search.indexOf("?") > -1) {
        const queryString = location.search.split("?")[1];
        const queryObj = parseQueryString(queryString);

        if(Object.keys(queryObj).indexOf("cards") > -1) {
            let candidates = queryObj["candidates"].split(",");
            let view = queryObj["view"];
            let topics = queryObj["topic"].split("|");
            let allCards = candidates;
            if(view !== "Overview") {
                allCards = cartProd(candidates, topics);
            }

            const candidateCards = allCards.map((candidate) =>
                <Card
                    key={candidate}
                    candidate={candidate}
                    view={view}
                    isPrint={true}
                />
            );

            printBody = <div>
                {candidateCards}
            </div>;
        }
        else {
            const candidateFirstName = cardData[queryObj.candidate]["First name"];
            const party = cardData[queryObj.candidate]["Party"];
            // console.log(queryObj);

            printBody = <ModalContent
                    candidateFirstName={candidateFirstName}
                    candidateLastName={queryObj.candidate}
                    view={queryObj.view}
                    topic={queryObj.topic}
                    party={party}
                    isPrint={true}
                />;
        }
    }
    return (
        <div className={printStyles.print}>
            <div className="header">
                <img src={logo} alt="TPC logo" style={{ width: 70 }} />
                <h1 style={{fontSize: `12pt`}}>{data.site.siteMetadata.title}</h1>
                <p style={{fontSize: `12pt`, lineHeight: `16pt`}}>How would the 2020 presidential candidates change the tax code? We dig into the details of their latest proposals.</p>
            </div>
            {printBody}
        </div>
    )
}

export default PrintPage
