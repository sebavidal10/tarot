import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Default';

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [intention, setIntention] = useState('');

  useEffect(() => {
    sessionStorage.removeItem('current_reading');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reading', { state: { userName, intention } });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300 relative flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full text-center space-y-20 px-4 relative z-10 py-20">
          <header className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-bold font-horror tracking-tighter text-marble-900 dark:text-marble-100">
              TAROT <br />
              <span className="text-blood-700">ARCANA</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 dark:text-void-700 max-w-xl mx-auto font-serif italic uppercase tracking-[0.3em]">
              La voz de las sombras
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="space-y-12 max-w-sm mx-auto relative z-30"
          >
            <div className="space-y-8">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Tu nombre..."
                required
                autoFocus
                className="w-full bg-transparent border-b border-marble-200 dark:border-void-800 p-4 text-center text-marble-900 dark:text-marble-100 font-serif text-3xl focus:outline-none focus:border-blood-700 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
              <textarea
                placeholder="Tu intención (Opcional)"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                rows="2"
                className="w-full bg-transparent border-b border-marble-200 dark:border-void-800 p-4 text-center text-marble-900 dark:text-marble-100 font-serif italic text-lg focus:outline-none focus:border-blood-700 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full group relative py-5 border border-blood-900 dark:border-blood-800 rounded-sm hover:bg-blood-900 hover:text-white transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 font-horror text-2xl tracking-[0.5em] text-blood-700 group-hover:text-white transition-colors">
                INVOCAR
              </span>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
