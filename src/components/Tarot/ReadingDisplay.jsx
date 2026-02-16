import React from 'react';
import { motion } from 'framer-motion';

const ReadingDisplay = ({ reading, isLoading, onReset }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-8">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-blood-900/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blood-700 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="font-gothic text-blood-500 uppercase tracking-[0.3em] animate-pulse">
          Canalizando las energías...
        </p>
      </div>
    );
  }

  if (!reading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto relative mt-2"
    >
      <div className="absolute -top-6 -left-6 w-20 h-20 border-t-2 border-l-2 border-blood-700/20 opacity-30"></div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 border-b-2 border-r-2 border-blood-700/20 opacity-30"></div>

      <div className="bg-white dark:bg-[#050505] border border-blood-900/10 dark:border-void-800 p-8 md:p-16 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-blood-700"></div>

        <h3 className="text-4xl font-horror text-center text-marble-900 dark:text-marble-100 mb-12 uppercase tracking-tighter">
          La voz del oráculo
        </h3>

        <div className="prose prose-invert max-w-none">
          <div className="font-serif text-xl leading-relaxed text-gray-900 dark:text-gray-200 text-justify selection:bg-blood-900/30">
            {reading
              .split('\n')
              .filter((p) => p.trim())
              .map((paragraph, i) => (
                <p
                  key={i}
                  className={`${i === 0 ? 'first-letter:text-6xl first-letter:font-horror first-letter:mr-4 first-letter:float-left first-letter:text-blood-700' : ''} mb-8`}
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={onReset}
            className="group px-12 py-4 border border-blood-900 text-blood-700 hover:bg-blood-900 hover:text-white transition-all font-accent text-xs uppercase tracking-[0.5em]"
          >
            Cerrar el círculo
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReadingDisplay;
