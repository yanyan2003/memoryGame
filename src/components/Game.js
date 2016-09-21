import React from "react";
import RaisedButton from "material-ui/lib/raised-button.js";
import Card from "components/Card";

const suits = [
    "clubs",
    "diamonds",
    "hearts",
    "spades"
];

const faceCards = {
    11: 'jack',
    12: 'queen',
    13: 'king',
    14: 'ace'
};

function shuffleCards(cards) {
    let index = cards.length, tempValue, randomIndex;

    while (0 !== index) {
        randomIndex = Math.floor(Math.random() * index);
        index -= 1;
        tempValue = cards[index];
        cards[index] = cards[randomIndex];
        cards[randomIndex] = tempValue;
    }

    return cards;
}

function initializeCards() {
    const cards = [];
    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * (15 - 2)) + 2;
        if (randomNumber > 10) {
            randomNumber = faceCards[randomNumber];
        }

        const randomSuit = Math.floor(Math.random() * 4);
        const suit = suits[randomSuit];
        const img = require(`images/${randomNumber}_of_${suit}.png`);
        for (let j = 0; j < 2; j++) {
            cards.push(
                {
                    value: `${randomNumber}${suit}`,
                    img: img,
                    matched: false,
                    flipped: false}
            );
        }
    }

    shuffleCards(cards);
    return cards;
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.renderCards = this.renderCards.bind(this);
        this.checkMatch = this.checkMatch.bind(this);
        this.reset = this.reset.bind(this);

        this.state = {
            cards: initializeCards(),
            lastCard: null,
            locked: false,
            matches: 0
        };
    }

    checkMatch(value, id) {
        if (this.state.locked) {
            return;
        }

        var cards = this.state.cards;
        cards[id].flipped = true;
        this.setState({
            cards,
            locked: true
        });

        if (this.state.lastCard) {
            if (value === this.state.lastCard.value) {
                var matches = this.state.matches;
                cards[id].matched = true;
                cards[this.state.lastCard.id].matched = true;
                this.setState({
                    cards,
                    lastCard: null,
                    locked: false,
                    matches: matches + 1
                });
            } else {
                setTimeout(() => {
                    cards[id].flipped = false;
                    cards[this.state.lastCard.id].flipped = false;
                    this.setState({
                        cards,
                        lastCard: null,
                        locked: false
                    });
                }, 700);
            }
        } else {
            this.setState({
                lastCard: {id, value},
                locked: false
            });
        }
    }

    renderCards(cards) {
        return cards.map((card, index) => {
            return (
                <Card
                    key={index}
                    value={card.value}
                    id={index}
                    matched={card.matched}
                    flipped={card.flipped}
                    img={card.img}
                    checkMatch={this.checkMatch} />
            );
        });
    }

    reset() {
        this.setState({
            cards: initializeCards(),
            lastCard: null,
            locked: false,
            matches: 0
        });
    }

    render() {
        var btnText = this.state.matches === this.state.cards.length / 2 ? 'You Win! Play Again?' : 'New Game';
        return (
            <div className="Game">
                <div>
                    {this.renderCards(this.state.cards)}
                </div>
                <div style={{"padding-top": "20px"}}>
                    <RaisedButton
                        className="button"
                        labelColor="blue"
                        label={btnText}
                        onMouseDown={this.reset}
                        style={{"right": "200px", "position": "fixed"}}/>
                </div>
            </div>
        );
    }
}
