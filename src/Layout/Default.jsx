import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-marble-50/80 dark:bg-void-800/80 backdrop-blur-xl p-4 border-b border-blood-900/20 dark:border-blood-900 sticky top-0 z-50 transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="text-marble-900 dark:text-gray-400 hover:text-blood-700 dark:hover:text-blood-500 transition-colors font-horror tracking-widest text-lg"
        >
          TAROT{' '}
          <span className="text-blood-700 dark:text-blood-700 font-bold">
            ARCANA
          </span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-blood-900 dark:text-blood-500 transition-all duration-300"
          title={theme === 'dark' ? 'Invocar Luz' : 'Invocar Sombra'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-marble-100 dark:bg-void-900 border-t border-blood-900/10 dark:border-blood-900/50 py-8 mt-12 transition-colors duration-500">
    <div className="container mx-auto px-4 text-center text-marble-800 dark:text-gray-500">
      <p className="font-serif italic text-blood-900/60 dark:text-blood-700/60 mb-2">
        "La luz revela lo que la sombra esconde..."
      </p>
      <p className="text-xs uppercase tracking-widest opacity-40">
        © {new Date().getFullYear()} Tarot Místico
      </p>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience handled by body CSS, but we add overlays here */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        {/* Dark Mode Overlay */}
        <div className="absolute inset-0 bg-void-900 opacity-0 dark:opacity-90 transition-opacity duration-700"></div>

        {/* Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blood-900/5 to-transparent dark:from-blood-900/10 pointer-events-none transition-all duration-700"></div>
      </div>

      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
export { Navbar, Footer };
