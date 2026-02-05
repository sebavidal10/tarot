import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Default';

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reading', { state: { userName } });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center space-y-16 py-12">
        <header className="space-y-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blood-700 blur-[100px] opacity-10 dark:opacity-20 pointer-events-none"></div>
          <h1 className="text-5xl md:text-7xl font-bold font-horror tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black dark:from-gray-100 dark:to-gray-600 drop-shadow-sm transition-colors duration-500">
            LECTURAS DEL <br />
            <span className="text-blood-700 drop-shadow-[0_0_15px_rgba(138,3,3,0.3)] dark:drop-shadow-[0_0_15px_rgba(138,3,3,0.5)]">
              DESTINO
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed font-serif">
            Donde la luz se quiebra y la sombra responde. La verdad se escribe
            en sangre y mármol.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 max-w-md mx-auto relative z-20"
        >
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blood-900 to-gray-400 dark:to-gray-900 rounded-lg blur opacity-10 dark:opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Escribe tu nombre..."
              className="relative w-full bg-white/50 dark:bg-void-800 border border-gray-300 dark:border-gray-700 group-hover:border-blood-700/50 
                       text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg px-6 py-4
                       text-center text-lg font-serif tracking-wide
                       focus:outline-none focus:ring-1 focus:ring-blood-900/50 transition-all backdrop-blur-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blood-900/10 dark:bg-blood-900/20 border-2 border-blood-700 hover:bg-blood-700 hover:border-blood-500 
                     text-blood-900 dark:text-blood-100 hover:text-white
                     px-8 py-4 rounded-sm transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blood-900/50"
          >
            <span className="font-horror text-xl tracking-[0.2em] uppercase font-bold">
              Invocar Destino
            </span>
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default HomePage;
