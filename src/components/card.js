import React, { Component}  from "react"
import cardStyles from "./card.module.css"

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
        }
    }

    handleCardClick = () => {
        console.log("open modal");
        this.setState({isModal: true});
    }

    handleModalCloseBtnClick = (e) => {
        console.log("close modal");
        e.preventDefault();
        this.setState({isModal: false});
    }

    render() {
        return (
            <div
                className={cardStyles.card + " " + (this.state.isModal ? cardStyles.modalView : "")}
                onClick={this.handleCardClick}
            >
                {this.props.candidate.name}
                <br />
                {this.props.view}
                <button
                    className={cardStyles.closeModalBtn}
                    onClick={this.handleModalCloseBtnClick}
                >
                    Close
                </button>
            </div>
        )
    }
}

export default Card