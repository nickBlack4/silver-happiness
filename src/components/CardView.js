// **************************************
//  Class:  CardView.js
//  Defines the view of a memory card
// **************************************

import React, { Component } from 'react';
import '../css/Game.css';

class CardView extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  // *****************************************************
  //      onClick
  // ties onCardClicked method from Game.js to this card
  // *****************************************************
  onClick() {
    if (!this.props.matched && !this.props.imageUp) {
      this.props.onClick(this.props.id, this.props.image);      
    }
  }

  // ************************************
  //      render
  // ************************************
  render = () => {
    let imPath = './images/';

    // set image path based on whether imageUp is true
    imPath = (this.props.imageUp) ? imPath + this.props.image + '.jpg' : imPath + 'back.png';

    let className='card';
    if (this.props.matched) className = className + ' matched';

    return (
        <img className={className} src={require(`${imPath}`)} alt='' onClick={this.onClick}/>
    );      
  };
  
}; // CardView

export default CardView;
