import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card, isRevealed, index, onClick, isSelected, inverted }) => {
  return (
    <div
      className={`relative perspective-1000 cursor-pointer w-full h-full`}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: 'spring',
          damping: 20,
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {/* Front (Back of the card in tarot terms, the hidden state) */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl border border-marble-200 dark:border-void-800 bg-white dark:bg-[#0a0a0a] flex items-center justify-center overflow-hidden shadow-lg transition-colors duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-4 border border-marble-100 dark:border-void-900 rounded-sm flex items-center justify-center">
            <div className="w-16 h-16 border-t-2 border-l-2 border-blood-700 dark:border-blood-900 rotate-45"></div>
            <div className="absolute w-2 h-2 bg-blood-700 dark:bg-blood-900 rounded-full"></div>
          </div>
        </div>

        {/* Back (The actual image, revealed state) */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl border border-marble-200/20 bg-black flex flex-col items-center justify-between shadow-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: `rotateY(180deg)`,
          }}
        >
          <div className="w-full h-full relative overflow-hidden">
            <motion.img
              src={card.image}
              alt={card.name_es}
              initial={false}
              animate={{ rotate: inverted ? 180 : 0 }}
              className="w-full h-full object-cover"
              style={{ transformOrigin: 'center center' }}
            />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-0 right-0 text-center px-4">
              <p className="text-white text-xl font-serif italic tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {card.name_es}
              </p>
              <p className="text-[10px] text-gray-300 font-serif uppercase tracking-[0.2em] opacity-90 mt-1">
                {card.name}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {isSelected && !isRevealed && (
        <motion.div
          layoutId="highlight"
          className="absolute -inset-1 border-2 border-blood-700 rounded-2xl blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </div>
  );
};

export default Card;
