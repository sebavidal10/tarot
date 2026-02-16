import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../components/Tarot/Card';

import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Default';
import { getTarotReading } from '../../services/tarotService';
import { TAROT_CARDS } from '../../constants/tarotCards';
import { useTarotHistory } from '../../hooks/useTarotHistory';
import DeckArea from '../../components/Tarot/DeckArea';
import CardReveal from '../../components/Tarot/CardReveal';
import ReadingDisplay from '../../components/Tarot/ReadingDisplay';
import ReadingHistory from '../../components/Tarot/ReadingHistory';
import { History as HistoryIcon, Volume2, VolumeX } from 'lucide-react';
import './ReadingPage.css';

const ReadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { history, saveReading, deleteReading } = useTarotHistory();

  // State
  const [userName, setUserName] = useState(
    location.state?.userName || 'Alma Perdida',
  );
  const [intention, setIntention] = useState(location.state?.intention || '');
  const [selectedCards, setSelectedCards] = useState([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Audio effects
  const playSound = useCallback(
    (type) => {
      if (isMuted) return;
      const sounds = {
        click: '/sounds/click.mp3',
        slide: '/sounds/slide.mp3',
        reveal: '/sounds/reveal.mp3',
        shimmer: '/sounds/shimmer.mp3',
      };
      const audio = new Audio(sounds[type]);
      audio.volume = 0.4;
      audio.play().catch((e) => console.log('Audio play blocked'));
    },
    [isMuted],
  );

  // Handle Refresh: If no state, try to recover or redirect
  useEffect(() => {
    if (!location.state?.userName) {
      const savedState = sessionStorage.getItem('current_reading');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setUserName(parsed.userName);
        setIntention(parsed.intention);
        setSelectedCards(parsed.selectedCards || []);
        setRevealedCount(parsed.revealedCount || 0);
        setReading(parsed.reading || '');
      } else {
        // Redirect if no context
        // navigate('/');
      }
    }
  }, [location.state, navigate]);

  // Save current state to session storage to persist across refreshes
  useEffect(() => {
    sessionStorage.setItem(
      'current_reading',
      JSON.stringify({
        userName,
        intention,
        selectedCards,
        revealedCount,
        reading,
      }),
    );
  }, [userName, intention, selectedCards, revealedCount, reading]);

  const handleCardSelect = (card) => {
    if (selectedCards.length >= 3) return;

    playSound('click');
    if (navigator.vibrate) navigator.vibrate(10);

    const isInverted = Math.random() < 0.2; // 20% probability
    const newCard = { ...card, inverted: isInverted };

    setSelectedCards((prev) => [...prev, newCard]);
  };

  const handleReveal = () => {
    if (revealedCount < 3) {
      playSound('reveal');
      if (navigator.vibrate) navigator.vibrate(20);
      setRevealedCount((prev) => prev + 1);
    }
  };

  // Auto-reveal sequence when 3 cards are selected
  useEffect(() => {
    if (selectedCards.length === 3 && revealedCount < 3) {
      const timer = setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
        playSound('reveal');
      }, 1200); // 1.2s delay between each automated reveal
      return () => clearTimeout(timer);
    }
  }, [selectedCards, revealedCount, playSound]);

  // Trigger AI call only after ALL cards are revealed
  useEffect(() => {
    if (revealedCount === 3 && !reading && !isLoading) {
      const fetchReading = async () => {
        setIsLoading(true);
        setError('');
        // Add a small ritual delay before showing the reading text
        await new Promise((resolve) => setTimeout(resolve, 800));

        try {
          const text = await getTarotReading(
            userName,
            selectedCards,
            intention,
          );
          setReading(text);
          saveReading({
            userName,
            cards: selectedCards,
            intention,
            reading: text,
          });
          playSound('shimmer');
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchReading();
    }
  }, [
    revealedCount,
    reading,
    isLoading,
    userName,
    selectedCards,
    intention,
    saveReading,
    playSound,
  ]);

  const resetRitual = () => {
    setSelectedCards([]);
    setRevealedCount(0);
    setReading('');
    setError('');
    sessionStorage.removeItem('current_reading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300 relative">
        <div className="max-w-6xl mx-auto pb-32 px-4 relative z-10">
          {/* Header Actions */}
          <div className="fixed top-24 right-8 z-40 flex flex-col gap-4">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="p-3 bg-white dark:bg-void-900 border border-marble-200 dark:border-void-700 rounded-full text-blood-700 hover:text-blood-500 transition-all shadow-lg"
              title="Historial"
            >
              <HistoryIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-white dark:bg-void-900 border border-marble-200 dark:border-void-700 rounded-full text-gray-400 hover:text-blood-700 transition-all shadow-lg"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="text-center space-y-2 pt-16 mb-20">
            <h2 className="text-4xl md:text-6xl font-horror tracking-tighter text-marble-900 dark:text-marble-100">
              EL DESTINO DE <span className="text-blood-700">{userName}</span>
            </h2>
            <p className="font-serif italic text-sm text-gray-400 dark:text-void-700 uppercase tracking-[0.4em]">
              Consulta Arcana
            </p>
          </div>

          {/* Altar Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto mb-4">
            {['Pasado', 'Presente', 'Futuro'].map((pos, idx) => (
              <div key={pos} className="flex flex-col items-center gap-6">
                <span className="font-accent text-[12px] text-amber-900/40 dark:text-amber-600/40 uppercase tracking-[0.7em]">
                  {pos}
                </span>
                <div className="w-60 h-96 rounded-xl bg-white/40 dark:bg-void-950/40 slot-glow flex items-center justify-center relative shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-marble-200/50 dark:border-transparent">
                  {selectedCards[idx] ? (
                    <motion.div
                      layoutId={`card-${selectedCards[idx].name}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full h-full"
                    >
                      <Card
                        card={selectedCards[idx]}
                        isRevealed={idx < revealedCount}
                        inverted={selectedCards[idx].inverted}
                        onClick={() => idx === revealedCount && handleReveal()}
                      />
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 opacity-5">
                      <div className="w-16 h-16 border border-blood-900 rotate-45"></div>
                      <span className="font-serif text-xs uppercase tracking-[0.3em] dark:text-white">
                        Arcano {pos}
                      </span>
                    </div>
                  )}
                </div>
                {selectedCards[idx] && idx < revealedCount && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-6"
                  >
                    <p className="font-horror text-marble-900 dark:text-marble-100 text-4xl tracking-tighter brightness-105 dark:brightness-150 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      {selectedCards[idx].name_es}
                    </p>
                    <p className="text-[12px] text-blood-700 font-serif italic uppercase tracking-[0.5em] mt-3">
                      {selectedCards[idx].inverted
                        ? 'Arcano Invertido'
                        : 'Arcano al Derecho'}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Interaction Area */}
          <div className="relative">
            {revealedCount < 3 ? (
              <DeckArea
                allCards={TAROT_CARDS}
                onSelect={handleCardSelect}
                selectedCount={selectedCards.length}
                selectedCards={selectedCards}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <ReadingDisplay
                  reading={reading}
                  isLoading={isLoading}
                  onReset={resetRitual}
                />
              </motion.div>
            )}
          </div>

          {selectedCards.length === 3 && error && (
            <div className="text-center p-8 bg-blood-900/10 border border-blood-900/30 rounded-lg max-w-md mx-auto mt-12 animate-pulse">
              <p className="text-blood-700 font-serif italic mb-4">{error}</p>
              <button
                onClick={resetRitual}
                className="font-accent text-xs uppercase tracking-widest underline decoration-blood-900"
              >
                Limpiar altar
              </button>
            </div>
          )}

          <ReadingHistory
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            history={history}
            onDelete={deleteReading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ReadingPage;
