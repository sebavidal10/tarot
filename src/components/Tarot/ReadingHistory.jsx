import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Clock } from 'lucide-react';

const ReadingHistory = ({ isOpen, onClose, history, onDelete }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-void-900 border-l border-marble-200 dark:border-void-700 z-[60] shadow-2xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8 border-b border-marble-200 dark:border-void-700 pb-4">
              <h2 className="text-2xl font-horror text-marble-900 dark:text-marble-100 flex items-center gap-3">
                <Clock className="w-5 h-5 text-blood-700" />
                Historial
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-marble-100 dark:hover:bg-void-800 rounded-full transition-colors text-gray-400 dark:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-serif italic text-gray-500">
                    Ninguna lectura guardada aún...
                  </p>
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-marble-50 dark:bg-void-800/50 border border-marble-200 dark:border-void-700 p-4 rounded-lg hover:border-blood-900/40 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] text-gray-500 font-mono tracking-tighter">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blood-700 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm font-serif text-gray-800 dark:text-marble-200 line-clamp-3 mb-2">
                      {item.reading}
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {item.cards.map((c, i) => (
                        <div
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 bg-marble-200 dark:bg-void-700 rounded text-gray-600 dark:text-gray-400"
                        >
                          {c.name_es}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReadingHistory;
