import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import Navbar from './Navbar';
import Card from './Card';


const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

export default class MemoryGame extends Component {
  constructor(props) {
    super(props);

    let cards = [
      {id: 0, cardState: CardState.HIDING, backgroundColor: '#f4cd40'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: '#f4cd40'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: '#a92e45'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: '#a92e45'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: '#456c63'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: '#456c63'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: '#16161f'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: '#16161f'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: '#632144'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: '#632144'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: '#72a3ae'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: '#72a3ae'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: '#f4dfd8'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: '#f4dfd8'},
      {id: 14, cardState: CardState.HIDING, backgroundColor: '#ff8ba3'},
      {id: 15, cardState: CardState.HIDING, backgroundColor: '#ff8ba3'},
    ];
    cards = shuffle(cards);
    this.state = {cards, noClick: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(card => {
        if (idsToChange.includes(card.id)) {
          return {
            ...card,
            cardState: newCardState
          };
        }
        return card;
      });
    }

    const foundCard = this.state.cards.find(card => card.id === id);
    
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    
    let noClick = false;
    
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    
    const showingCards =  cards.filter((card) => card.cardState === CardState.SHOWING);
    
    const ids = showingCards.map(card => card.id);
    
    if (showingCards.length === 2 &&
        showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      
      noClick = true;
      
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          this.setState({cards: hidingCards, noClick: false});
        }, 1300);
      });
      return;
    }
    
    this.setState({cards, noClick});
  }
  handleNewGame() {
    let cards = this.state.cards.map(card => ({
      ...card,
      cardState : CardState.HIDING
    }));
    cards = shuffle(cards);
    this.setState({cards});
  }

  render() {
    const cards = this.state.cards.map((card) => (
      <Card
        key={card.id}
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)} 
      />
    ));

    return(
      <div>
        <Navbar onNewGame={this.handleNewGame} />
        <div style={{
          width: '50%',
          margin: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {cards}
        </div>
      </div>
    );
  }
}