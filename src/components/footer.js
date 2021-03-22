//import { Link } from "gatsby"
import React from "react"
import footerStyles from "./footer.module.css"

const Footer = () => (
    <footer
        style={{
            background: `#f1f2f2`,
            width: `100%`,
            clear: `both`
        }}
    >
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 750,
                padding: `1.45rem 1.0875rem`,
            }}
        >
            <h4 className={footerStyles.footerHeader}>About</h4>
            <p className={footerStyles.footerText}>This tool was published on December 12, 2019, and will be updated as the campaigns clarify or release new proposals.</p>
            <p className={footerStyles.footerText}>View and download the <a href="../../Methodology.pdf" target="_blank" rel="noopener noreferrer">technical appendix</a>.</p>

            <h4 className={footerStyles.footerHeader}>Project Credits</h4>
            <p className={footerStyles.footerText}>
                This feature was funded by <a href="https://www.arnoldventures.org/" target="_blank" rel="noopener noreferrer">Arnold Ventures</a>. We are grateful to them and to all our funders, who make it possible for the Tax Policy Center to advance its mission. The views expressed are those of the authors and should not be attributed to the Urban Institute, the Brookings Institution, their trustees, or their funders. Funders do not determine research findings or the insights and recommendations of Tax Policy Center experts. More information on the Tax Policy Center’s funding principles is available <a href="http://www.taxpolicycenter.org/support/funding-principles" target="_blank" rel="noopener noreferrer">here</a>. Read Urban’s terms of service <a href="https://www.urban.org/terms-service" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
            <h5 className={footerStyles.job}>Research</h5>
            <p className={footerStyles.footerText}><a href="https://www.urban.org/author/janet-holtzblatt" target="_blank" rel="noopener noreferrer">Janet Holtzblatt</a> and <a href="https://www.urban.org/author/nikhita-airi" target="_blank" rel="noopener noreferrer">Nikhita Airi</a></p>
            <h5 className={footerStyles.job}>Design</h5>
            <p className={footerStyles.footerText}>Allison Feldman</p>
            <h5 className={footerStyles.job}>Development</h5>
            <p className={footerStyles.footerText}>Alice Feng</p>
            <h5 className={footerStyles.job}>Editing</h5>
            <p className={footerStyles.footerText}>Michael Marazzi and Serena Lei</p>
            <div className={footerStyles.mediaInquiries}>
                <h5 className={footerStyles.job}>For media inquiries</h5>
                <p><a mailto="media@urban.org">media@urban.org</a></p>
                <p>202-261-5709</p>
            </div>
            <p className={footerStyles.githubLink}><a href="https://github.com/UI-Research/candidate-tax-matrix-2020" target="_blank" rel="noopener noreferrer">View this project on GitHub</a></p>
        </div>
    </footer>
)

export default Footer
