import React from 'react';
import { motion } from 'framer-motion';

const DeckArea = ({
  allCards,
  onSelect,
  selectedCount,
  maxSelect = 3,
  selectedCards = [],
}) => {
  return (
    <div className="relative h-[480px] w-full flex items-center justify-center py-6">
      {/* Mystical Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blood-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-5xl mx-auto flex justify-center">
        {allCards.map((card, index) => {
          const isSelected = selectedCards.some((s) => s.name === card.name);
          const total = allCards.length;
          const angle = (index - total / 2) * 4.5;
          const xOffset = (index - total / 2) * 26;
          const yOffset = Math.abs(index - total / 2) * 5;

          return (
            <motion.div
              key={card.name}
              className="absolute cursor-pointer"
              style={{
                zIndex: index,
                originY: 2.2,
              }}
              initial={{ y: 400, opacity: 0 }}
              animate={{
                rotate: angle,
                x: xOffset,
                y: yOffset,
                opacity: isSelected ? 0 : 1,
                pointerEvents: isSelected ? 'none' : 'auto',
                transition: { delay: index * 0.01, duration: 0.5 },
              }}
              whileHover={
                !isSelected
                  ? {
                      y: yOffset - 60,
                      scale: 1.15,
                      zIndex: 1000,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
              onClick={() => !isSelected && onSelect(card)}
            >
              <div className="w-44 h-64 rounded-xl border border-amber-600/30 bg-[#0d0d0d] shadow-[0_0_40px_rgba(0,0,0,0.9)] group relative overflow-hidden transition-all duration-500">
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
                <div className="absolute inset-4 border border-amber-600/10 rounded flex items-center justify-center">
                  <div className="w-12 h-12 border border-amber-900/40 rotate-45 opacity-60"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-4 text-center w-full">
        <p className="font-accent text-amber-600/60 uppercase tracking-[0.6em] text-xs drop-shadow-md animate-pulse">
          Elige {maxSelect - selectedCount} arcano
          {maxSelect - selectedCount > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default DeckArea;
