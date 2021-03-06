import React from "react"
import ReactMarkdown from 'react-markdown/with-html';
// import cardData from "../data/data.json"
import contentDivStyles from "./content-div.module.css"

function convertUnicode(input) {
    return input.replace(/\\u(\w{4,4})/g,function(a,b) {
        var charcode = parseInt(b,16);
        return String.fromCharCode(charcode);
    });
}

function ContentDiv(props) {
    const contentBullets = props.data.map((bullet, index) => {
        if (bullet.indexOf("\\n\\u2022") > -1) {
            const subbullets = bullet.split("\\n\\u2022 ");
            const subbulletsList = subbullets.slice(1).map((subbullet, index) =>
                <li key={index}><ReactMarkdown source={convertUnicode(subbullet)} linkTarget="_blank" /></li>
            );

            return (
                <li key={index}><ReactMarkdown source={convertUnicode(subbullets[0])} linkTarget="_blank" escapeHtml={false} />
                    <ul>
                        {subbulletsList}
                    </ul>
                </li>
            )
        }
        else {
            return <li key={index}><ReactMarkdown source={convertUnicode(bullet)} linkTarget="_blank" escapeHtml={false} /></li>
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