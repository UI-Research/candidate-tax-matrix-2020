import React, { Component } from "react"
import TpcHeaderStyles from "./tpc-header.module.css"

class TpcHeader extends Component {
    state = {
        shareBoxIsVisible: false,
    };

    toggleShareBoxVisibility = () => {
        this.setState({shareBoxIsVisible: !this.state.shareBoxIsVisible});
    };

    render() {
        return (
            <div
              style={{
                width: `100%`,
                height: 56,
                background: `#fff`,
              }}
              className={TpcHeaderStyles.headerPinned}
            >
                <a href="https://www.taxpolicycenter.org/" target="_blank"  title="Home" rel="noopener noreferrer" className={TpcHeaderStyles.siteLogo}>&nbsp;</a>
                <div className={TpcHeaderStyles.title}>
                    <span className={TpcHeaderStyles.featureLink}>
                        <a href="https://www.taxpolicycenter.org/features" target="_blank" rel="noopener noreferrer" alt="Tax Policy Center Logo">Features</a>
                    </span>
                </div>
                <div className={TpcHeaderStyles.shareIcons}>
                    <div className={TpcHeaderStyles.shareThisP}>
                        <span onClick={this.toggleShareBoxVisibility}>
                            <div className={TpcHeaderStyles.shareThisB}></div>
                        </span>
                        <div className={TpcHeaderStyles.shareThisW + " " + (this.state.shareBoxIsVisible ? TpcHeaderStyles.visible : "")} id="shareBox">
                             <div className={TpcHeaderStyles.addthisToolbox}>
                                <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//urbn.is/2020tax" target="_blank" rel="noopener noreferrer" className={TpcHeaderStyles.addthisButtonFacebook} title="Facebook" onClick={this.toggleShareBoxVisibility}>
                                    <span style={{backgroundColor: `rgb(48, 88, 145)`}}>
                                        <span className={TpcHeaderStyles.atA11y}>Share on facebook</span>
                                    </span>
                                </a>
                                <a href="https://twitter.com/intent/tweet?text=From%20%40taxpolicycenter%3A%20Where%20the%202020%20Presidential%20Candidates%20Stand%20on%20Tax%20Policy.%20https%3A%2F%2Furbn.is%2F2020tax" target="_blank" rel="noopener noreferrer" className={TpcHeaderStyles.addthisButtonTwitter} title="Tweet" onClick={this.toggleShareBoxVisibility}>
                                    <span style={{backgroundColor: `rgb(44, 168, 210)`}}>
                                        <span className={TpcHeaderStyles.atA11y}>Share on twitter</span>
                                    </span>
                                </a>
                                <a href="mailto:%20?Subject=New Tax Policy Center tool&amp;Body=Hi! I thought you'd be interested in this new tool from Tax Policy Center: 'Where the 2020 Presidential Candidates Stand on Tax Policy' https://urbn.is/2020tax" target="_blank" rel="noopener noreferrer" className={TpcHeaderStyles.addthisButtonEmail} title="Email" onClick={this.toggleShareBoxVisibility}>
                                    <span style={{backgroundColor: `rgb(115, 138, 141)`}}>
                                        <span className={TpcHeaderStyles.atA11y}>Share on email</span>
                                    </span>
                                </a>

                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TpcHeader