import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../Layout/Default';
import { getTarotReading } from '../../services/tarotService';
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
    name_es: 'La Suma Sacerdotisa',
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
  const userName = location.state?.userName || 'Alma Perdida';
  const [selectedCards, setSelectedCards] = useState([]);
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const selectRandomCards = () => {
      const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };
    setSelectedCards(selectRandomCards());
  }, []);

  const generateReading = async () => {
    setIsLoading(true);
    setError('');
    setReading('');
    setHasRevealed(true);

    try {
      const readingText = await getTarotReading(userName, selectedCards);
      setReading(readingText);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'El velo es demasiado grueso hoy...');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-6xl font-horror tracking-normal text-gray-800 dark:text-gray-200 transition-colors duration-500">
            EL DESTINO DE{' '}
            <span className="text-blood-700 uppercase">{userName}</span>
          </h2>
          <div className="h-px w-24 bg-blood-700/50 dark:bg-blood-900 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8 px-4">
          {selectedCards.map((card, index) => (
            <div
              key={index}
              className={`
                relative group perspective-1000
                ${hasRevealed ? 'opacity-100' : 'opacity-100'}
              `}
            >
              <div
                className="bg-white dark:bg-void-800 border-2 border-gray-200 dark:border-void-700 hover:border-blood-700/40 dark:hover:border-blood-900/60 rounded-xl p-4 
                         shadow-lg dark:shadow-2xl hover:shadow-blood-900/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="mb-4 text-center">
                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-void-900 border border-gray-300 dark:border-void-700 rounded text-xs font-bold text-blood-700 dark:text-blood-500 uppercase tracking-[0.2em] transition-colors duration-500">
                    {index === 0
                      ? 'Pasado'
                      : index === 1
                        ? 'Presente'
                        : 'Futuro'}
                  </div>
                </div>

                <div className="relative aspect-[2/3] overflow-hidden rounded-lg mb-4 border border-gray-300 dark:border-gray-900">
                  <div className="absolute inset-0 bg-blood-900/10 dark:bg-blood-900/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                  <img
                    src={card.image}
                    alt={card.name_es}
                    className="w-full h-full object-cover grayscale brightness-90 dark:brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-horror text-gray-800 dark:text-gray-200 transition-colors duration-500">
                    {card.name_es}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-600 font-serif italic">
                    {card.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!reading && !error && (
          <div className="text-center animate-pulse-slow">
            <button
              onClick={generateReading}
              disabled={isLoading}
              className="group relative overflow-hidden bg-transparent border border-blood-700 text-blood-700 dark:text-blood-500 px-12 py-4 
                       rounded hover:bg-blood-900/5 dark:hover:bg-blood-900/10 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 font-gothic text-xl tracking-widest uppercase">
                {isLoading ? 'Invocando...' : 'Revelar Verdad'}
              </span>
            </button>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto bg-blood-50/50 dark:bg-blood-900/20 border border-blood-200 dark:border-blood-700/50 rounded p-8 text-center backdrop-blur-sm">
            <h3 className="text-xl font-gothic text-blood-700 dark:text-blood-400 mb-2">
              Presagio Oscuro
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-serif italic mb-4">
              {error}
            </p>
            <button
              onClick={generateReading}
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white underline decoration-blood-700 underline-offset-4"
            >
              Intentar el ritual de nuevo
            </button>
          </div>
        )}

        {reading && (
          <div className="max-w-3xl mx-auto relative mt-16 animate-fade-in">
            {/* Ornamental Borders */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-blood-700/30 dark:border-blood-900 opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-blood-700/30 dark:border-blood-900 opacity-50"></div>

            <div className="bg-white/80 dark:bg-void-900/80 border border-gray-200 dark:border-gray-800 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md rounded-sm transition-colors duration-500">
              <h3 className="text-4xl font-horror text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-black to-gray-600 dark:from-gray-400 dark:via-gray-100 dark:to-gray-400 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                La voz del más allá
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert prose-p:font-serif prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-p:leading-loose text-justify opacity-90 first-letter:text-6xl first-letter:font-horror first-letter:text-blood-700 dark:first-letter:text-blood-600 first-letter:mr-3 first-letter:mt-[-10px] first-letter:float-left">
                {reading}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs text-gray-500 hover:text-blood-700 dark:text-gray-600 dark:hover:text-blood-500 transition-colors uppercase tracking-[0.2em]"
                >
                  Cerrar el círculo (Reiniciar)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReadingPage;
