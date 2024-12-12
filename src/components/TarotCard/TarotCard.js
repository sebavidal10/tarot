import React from 'react';
import './TarotCard.css';

const TarotCard = ({ card }) => (
  <div className="tarot-card">
    <img src={card.image} alt={card.name} />
    <h3>{card.name}</h3>
  </div>
);

export default TarotCard;
