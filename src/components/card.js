import React, { Component}  from "react"
import cardStyles from "./cards.module.css"

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
        }
    }

    handleCardClick = () => {
        this.setState({isModal: true});
    }

    render() {
        return (
            <div
                className={cardStyles.card}
                onClick={this.handleCardClick}
            >
                {this.props.candidate.name}
                <br />
                {this.props.view}
            </div>
        )
    }
}

export default Card