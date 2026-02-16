import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const CardReveal = ({ selectedCards, revealedCount, onReveal }) => {
  const positions = ['Pasado', 'Presente', 'Futuro'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto px-4 my-24">
      {selectedCards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.3 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-900/50"></div>
              <span className="font-accent text-[12px] text-amber-600/80 uppercase tracking-[0.5em]">
                {positions[index]}
              </span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-900/50"></div>
            </div>
          </div>

          <Card
            card={card}
            isRevealed={index < revealedCount}
            inverted={card.inverted}
            onClick={() => index === revealedCount && onReveal()}
          />

          {index < revealedCount && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-1"
            >
              <h3 className="text-2xl font-horror text-marble-100 drop-shadow-lg">
                {card.name_es}
              </h3>
              <p className="text-[10px] text-blood-700 font-serif italic uppercase tracking-[0.3em]">
                {card.inverted ? 'Arcano Invertido' : 'Arcano al Derecho'}
              </p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default CardReveal;
