import React from "react"
import ReactMarkdown from 'react-markdown/with-html';
import correctionsStyles from "./corrections.module.css"

function convertUnicode(input) {
    return input.replace(/\\u(\w{4,4})/g,function(a,b) {
        var charcode = parseInt(b,16);
        return String.fromCharCode(charcode);
    });
}

function CorrectionsDiv(props) {
    const corrections = props.data.map((correction, index) => {
        if (correction.indexOf("\\n\\u2022") > -1) {
            const subbullets = correction.split("\\n\\u2022 ");
            const subbulletsList = subbullets.slice(1).map((subbullet, index) =>
                <ReactMarkdown source={convertUnicode(subbullet)} linkTarget="_blank" />
            );

            return (
                <div key={index}><ReactMarkdown source={convertUnicode(subbullets[0])} linkTarget="_blank" escapeHtml={false} />
                    <ul>
                        {subbulletsList}
                    </ul>
                </div>
            )
        }
        else {
            return <ReactMarkdown source={convertUnicode(correction)} linkTarget="_blank" escapeHtml={false} />
        }
    });

    return (
        <div className={correctionsStyles.correctionList + " " + (props.isPrint ? correctionsStyles.print : "")}>
            {corrections}
        </div>
    )
}

export default CorrectionsDiv