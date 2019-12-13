import React from "react"
import ReactMarkdown from 'react-markdown';
// import cardData from "../data/data.json"
import contentDivStyles from "./content-div.module.css"

function ContentDiv(props) {
    const contentBullets = props.data.map((bullet, index) => {
        if (bullet.indexOf("•") > -1) {
            const subbullets = bullet.split("•");
            const subbulletsList = subbullets.slice(1).map((subbullet, index) =>
                <li key={index}><ReactMarkdown source={subbullet} linkTarget="_blank" /></li>
            );

            return (
                <li key={index}><ReactMarkdown source={subbullets[0]} linkTarget="_blank" />
                    <ul>
                        {subbulletsList}
                    </ul>
                </li>
            )
        }
        else {
            return <li key={index}><ReactMarkdown source={bullet} linkTarget="_blank" /></li>
        }
    });

    return (
        <>
            <h4 className={contentDivStyles.topicSubhead + " " + (props.party === "Democratic" ? contentDivStyles.democrat : contentDivStyles.republican)}>{props.topic}</h4>
            <ul className={contentDivStyles.contentList + " " + (props.isPrint ? contentDivStyles.print : "")}>
                {contentBullets}
            </ul>
        </>
    )
}

export default ContentDiv