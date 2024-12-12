import React, { useState } from 'react';
import './Spread.css';
import TarotCard from '../TarotCard/TarotCard';

const cards = [
  {
    name: 'The Fool',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Magician',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The High Priestess',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Empress',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Emperor',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Hierophant',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Lovers',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Chariot',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'Strength',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Hermit',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'Wheel of Fortune',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'Justice',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Hanged Man',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'Death',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'Temperance',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Devil',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Tower',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Star',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Moon',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The Sun',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'Judgement',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
  {
    name: 'The World',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/carta.png',
  },
];

const shuffleCards = () => {
  return cards.sort(() => Math.random() - 0.5);
};

const Spread = () => {
  const [spread, setSpread] = useState(shuffleCards().slice(0, 3));

  return (
    <div className="text-center">
      <div className="spread">
        {spread.map((card, index) => (
          <TarotCard key={index} card={card} />
        ))}
      </div>
      <button onClick={() => setSpread(shuffleCards().slice(0, 3))}>
        Shuffle
      </button>
    </div>
  );
};

export default Spread;
