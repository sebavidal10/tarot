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
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-300 font-gothic">
            Lecturas del Tarot Místico
          </h1>
        </header>

        <section className="space-y-6 my-12">
          <p className="text-xl text-gray-300">
            Adéntrate en los misterios del tarot, donde las cartas revelan los
            secretos que el destino guarda para ti.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tu nombre..."
              className="w-full bg-gray-800/50 border-2 border-purple-700 rounded-lg px-4 py-3 
                       focus:outline-none focus:border-purple-500 placeholder-gray-500
                       text-center backdrop-blur-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="group bg-purple-700 hover:bg-purple-600 text-white px-8 py-3 
                     rounded-lg transition-all duration-300 flex items-center justify-center 
                     space-x-2 mx-auto"
          >
            <span className="font-gothic text-lg">Leer tu Suerte</span>
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default HomePage;
