import React from 'react';
import './TarotCard.css';

const TarotCard = ({ card }) => (
  <div className="tarot-card">
    <img src={card.image} alt={card.name} />
    <div>{card.name_es}</div>
  </div>
);

export default TarotCard;
