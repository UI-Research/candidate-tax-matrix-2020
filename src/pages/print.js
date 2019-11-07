import React from "react"
import cardData from "../data/data.json"
// import Layout from "../components/layout"

function PrintPage({ location }) {
    const queryString = location.search.split("?")[1];
    console.log(queryString);
    return (
        <div className="print">
            <h1>This is the printable page.</h1>
            <p>Path is {location.search}</p>
        </div>
    )
}

export default PrintPage
