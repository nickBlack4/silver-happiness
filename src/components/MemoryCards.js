// ****************************************************************
//  Class:  MemoryCards.js
//  @Constructor: initializes cards array sets const NUM_IMAGES = 10
//  Defines methods for the cards in the game.
// ****************************************************************

import shuffle from 'shuffle-array';

class MemoryCards {
  constructor() {
    this.cards = [];
    this.NUM_IMAGES = 10;
  }

  // **************************************************
  //      generateCardSet
  // generates a set of shuffled cards with image pairs
  // **************************************************
  generateCardSet = () => {
    this.cards = [];
    let id=1;
    for(let i=1; i <= this.NUM_IMAGES; i++) {
      let card1 = {
        id: id,
        image : i,
        imageUp: false,
        matched: false
      };
      id++;
      let card2 = {
        id: id,
        image : i,
        imageUp: false,
        matched: false
      };
      this.cards.push(card1);
      this.cards.push(card2);
      id++;
    }

    // randomize cards
    shuffle(this.cards);
  }

  // *************************************************
  //       getCard
  // @param: id
  // @return: card with id equal to the one passed in
  // *************************************************
  getCard = (id) => {
    for(let i=0; i < 2 * this.NUM_IMAGES; i++) {
      if (this.cards[i].id === id) return this.cards[i];
    };
  }

  // ******************************************************
  //      flipCard
  // @param: id, imageUp
  // set imageUp to true or false on card with matching id
  // ******************************************************
  flipCard = (id, imageUp) => this.getCard(id).imageUp = imageUp;

  // ******************************************************
  //      setCardAsMatched
  // @param: id, matched
  // set matched to true or false on card with matching id
  // ******************************************************
  setCardAsMatched = (id, matched) => this.getCard(id).matched = matched;

  // *************************************************************
  //      cardsHaveIdenticalImages
  // @param id1, id2
  // @return true if card w/ id1 has the same image as card w/ id2
  // *************************************************************
  cardsHaveIdenticalImages = (id1, id2) => this.getCard(id1).image === this.getCard(id2).image ? true : false;

}; // MemoryCards

export default MemoryCards;
