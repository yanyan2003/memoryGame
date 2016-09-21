import React from 'react';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if (!this.props.flipped) {
            this.props.checkMatch(this.props.value, this.props.id);
        }
    }

    render() {
        var cardValue = this.props.flipped
            ? <img
                src={this.props.img}
                width="100px" />
            : <img
                src={require('images/playing-card-back.jpg')}
                width="100px" />;
        return (
            <div className="Card" onClick={this.onClick}>
                {cardValue}
            </div>
        );
    }
}
