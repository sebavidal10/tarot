import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-[#050505] border-b border-marble-200 dark:border-void-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="text-marble-900 dark:text-marble-100 hover:text-blood-700 dark:hover:text-blood-500 transition-colors font-horror tracking-tighter text-xl"
        >
          TAROT <span className="text-blood-700">ARCANA</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full border border-marble-200 dark:border-void-800 hover:bg-marble-100 dark:hover:bg-void-800 text-blood-900 dark:text-blood-500 transition-all duration-300 shadow-sm"
          title={theme === 'dark' ? 'Invocar Luz' : 'Invocar Sombra'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white dark:bg-[#050505] border-t border-marble-200 dark:border-void-800 py-12 transition-colors duration-300">
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
    <div
      className={`flex flex-col min-h-screen relative overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#050505]' : 'bg-white'
      }`}
    >
      <Navbar />
      <main className="flex-grow flex flex-col relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
export { Navbar, Footer };
