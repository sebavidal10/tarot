import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../Layout/Default';

import TarotCard from '../../components/TarotCard/TarotCard';
import './ReadingPage.css';

const TAROT_CARDS = [
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

const ReadingPage = () => {
  const location = useLocation();
  const userName = location.state?.userName || 'Visitante';
  const [selectedCards, setSelectedCards] = useState([]);
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const selectRandomCards = () => {
      const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };
    setSelectedCards(selectRandomCards());
  }, []);

  const generateReading = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tarot-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          cards: selectedCards,
        }),
      });
      const data = await response.json();
      setReading(data.reading);
    } catch (error) {
      console.error('Error:', error);
      setReading('Lo siento, los espíritus están inquietos...');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-gothic text-purple-300">
          Tu Lectura de Tarot, {userName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {selectedCards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border-2 border-purple-700 rounded-lg p-6 
                         backdrop-blur-sm transform hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">
                <img src={card.image} />
              </div>
              <h3 className="text-xl font-gothic text-purple-300 mb-2">
                {card.name_es}
              </h3>
              {/* <p className="text-gray-300">{card.meaning}</p> */}
            </div>
          ))}
        </div>

        {!reading && (
          <button
            onClick={generateReading}
            disabled={isLoading}
            className="bg-purple-700 hover:bg-purple-600 text-white px-8 py-3 
                     rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <span className="font-gothic text-lg">
              {isLoading
                ? 'Consultando los astros...'
                : 'Revelar Interpretación'}
            </span>
          </button>
        )}

        {reading && (
          <div className="bg-gray-800/50 border-2 border-purple-700 rounded-lg p-6 my-8">
            <h3 className="text-2xl font-gothic text-purple-300 mb-4">
              Interpretación de tu Lectura
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">{reading}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReadingPage;
