import React, { useState } from 'react';
import './Spread.css';
import TarotCard from '../TarotCard/TarotCard';

const cards = [
  {
    name: 'The Fool',
    name_es: 'El Loco',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_fool.png',
  },
  {
    name: 'The Magician',
    name_es: 'El Mago',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_magician.png',
  },
  {
    name: 'The High Priestess',
    name_es: 'La Papisa',
    image:
      process.env.PUBLIC_URL + '/images/tarot-cards/the_high_priestess.png',
  },
  {
    name: 'The Empress',
    name_es: 'La Emperatriz',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_empress.png',
  },
  {
    name: 'The Emperor',
    name_es: 'El Emperador',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_emperor.png',
  },
  {
    name: 'The Hierophant',
    name_es: 'El Papa',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_hierophant.png',
  },
  {
    name: 'The Lovers',
    name_es: 'Los Enamorados',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_lovers.png',
  },
  {
    name: 'The Chariot',
    name_es: 'El Carro',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_chariot.png',
  },
  {
    name: 'Strength',
    name_es: 'La Fuerza',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/strength.png',
  },
  {
    name: 'The Hermit',
    name_es: 'El Ermitaño',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_hermit.png',
  },
  {
    name: 'Wheel of Fortune',
    name_es: 'La Rueda de la Fortuna',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/wheel_of_fortune.png',
  },
  {
    name: 'Justice',
    name_es: 'La Justicia',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/justice.png',
  },
  {
    name: 'The Hanged Man',
    name_es: 'El Colgado',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_hanged_man.png',
  },
  {
    name: 'Death',
    name_es: 'La Muerte',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/death.png',
  },
  {
    name: 'Temperance',
    name_es: 'La Templanza',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/temperance.png',
  },
  {
    name: 'The Devil',
    name_es: 'El Diablo',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_devil.png',
  },
  {
    name: 'The Tower',
    name_es: 'La Torre',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_tower.png',
  },
  {
    name: 'The Star',
    name_es: 'La Estrella',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_star.png',
  },
  {
    name: 'The Moon',
    name_es: 'La Luna',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_moon.png',
  },
  {
    name: 'The Sun',
    name_es: 'El Sol',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_sun.png',
  },
  {
    name: 'Judgement',
    name_es: 'El Juicio',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/judgment.png',
  },
  {
    name: 'The World',
    name_es: 'El Mundo',
    image: process.env.PUBLIC_URL + '/images/tarot-cards/the_world.png',
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
