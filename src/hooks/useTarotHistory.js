import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tarot_readings_history';

export const useTarotHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  const saveReading = (readingData) => {
    const newReading = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...readingData,
    };
    const updatedHistory = [newReading, ...history].slice(0, 20); // Keep last 20
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const deleteReading = (id) => {
    const updatedHistory = history.filter((r) => r.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  return { history, saveReading, deleteReading };
};
