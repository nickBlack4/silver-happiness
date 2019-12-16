// **************************************************
//  Class:  MemoryCards.js
//  Defines methods for the cards in the game.
// **************************************************

import React, { Component } from 'react';
import '../css/Game.css';
import CardView from './CardView';
import MemoryCards from './MemoryCards';

class Game extends Component {
  constructor(props) {
    super(props);
    this.memoryCards = new MemoryCards();
  }

  // cannot figure out how to get it to work with componentDidMount so using UNSAFE to suppress warning.
  UNSAFE_componentWillMount() {
    this.initGame();
  }

  // ************************************
  //      initGame
  // Generate shuffled card set
  // set initial state
  // ************************************
  initGame = () => {
    this.memoryCards.generateCardSet();
    this.setState({
      turnNo : 0,
      pairsFound : 0,
      numClicksWithinTurn : 0,
      firstId : undefined,
      secondId : undefined
    });
  }

  // ****************************************************
  //      getCardViews
  // @return: cardViews -- an array of <CardView /> cards
  // Setup cards with props and push to cardViews array.
  // ****************************************************
  getCardViews = () => {
    let cardViews = [];
    let onClick = this.onCardClicked;
    this.memoryCards.cards.forEach(c => {
      let cardView = <CardView 
        key={c.id} 
        id={c.id} 
        image={c.image}
        imageUp={c.imageUp}
        matched={c.matched} 
        onClick={onClick}
      />;
      // add card to array
      cardViews.push(cardView);
    });
    return cardViews;
  }

  // ************************************************************************
  //      clearCards
  // @param id1, id2 
  // if player has clicked on two cards, we reset state and increment turnNo
  // ************************************************************************
  clearCards = (id1, id2) => {
    if (this.state.numClicksWithinTurn !== 2) return;
    this.memoryCards.flipCard(this.state.firstId, false);
    this.memoryCards.flipCard(this.state.secondId, false);
    this.setState({
      firstId: undefined,
      secondId: undefined,
      numClicksWithinTurn: 0,
      turnNo : this.state.turnNo + 1
    });
  }

  // **************************************************
  //      onCardClicked
  // @param id, image
  // handles game logic when a card is clicked--namely
  // updating state appropriately.
  // **************************************************
  onCardClicked = (id, image) => {
    if (this.state.numClicksWithinTurn === 0 || this.state.numClicksWithinTurn === 2) {
      if (this.state.numClicksWithinTurn === 2) {
        clearTimeout(this.timeout);
        this.clearCards(this.state.firstId, this.state.secondId);        
      }
      this.memoryCards.flipCard(id, true);
      this.setState({
        firstId : id,
        numClicksWithinTurn : 1
      });
    } else if (this.state.numClicksWithinTurn === 1) {
      this.memoryCards.flipCard(id, true);
      this.setState({
        secondId : id,
        numClicksWithinTurn : 2
      });

      if (this.memoryCards.cardsHaveIdenticalImages(id, this.state.firstId)) {
        // cards matched--wait 1.2 seconds before removing
        setTimeout(() => {
          this.memoryCards.setCardAsMatched(this.state.firstId, true);
          this.memoryCards.setCardAsMatched(id, true);
          this.setState({
            pairsFound: this.state.pairsFound + 1,
            firstId: undefined,
            secondId: undefined,
            turnNo : this.state.turnNo + 1,
            numClicksWithinTurn: 0
          });
        },1200);

      } else {
        setTimeout(() => { 
          // console.log("didn't match turning back over");
          this.clearCards(this.state.firstId, this.state.secondId);
        },1200);
      }
    }
  } // onCardClicked

  // **************************************************
  //      onPlayAgain
  // call initGame which generates a shuffled card set
  // and sets the initial state of the game
  // **************************************************
  onPlayAgain = () => this.initGame();

  // **************************************
  //            render
  // **************************************
  render = () => {
    // cards array 
    let cardViews = this.getCardViews();

    let gameStatus = <div className='game-status'>
                      <div>Moves: {this.state.turnNo}</div>
                      <div>Score: {this.state.pairsFound}</div>
                    </div>;

    // Game over logic
    if (this.state.pairsFound === this.memoryCards.NUM_IMAGES) {
      gameStatus = <div className='game-status'>
                    <div>Awesome! You made {this.state.turnNo} moves</div>
                    <div>Your score is: {this.state.pairsFound}</div>
                    <div><button className='restart-button' onClick={this.onPlayAgain}>Play again?</button></div></div>; 
    }

    return (
      <div className='game-container'>
        <header className='game-header'>
          <h1>Memory</h1>
          <div>{gameStatus}</div>
        </header>
        <div className='card-container'>
          {cardViews}
        </div>
      </div>
    );
  }
  
} // Game

export default Game;
