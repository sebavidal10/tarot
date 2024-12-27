import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-black/50 backdrop-blur-sm p-4 border-b border-purple-900">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 hover:text-purple-400 transition-colors"
        >
          <span className="font-gothic">Inicio</span>
        </button>
        <button
          onClick={() => navigate('/about')}
          className="flex items-center space-x-2 hover:text-purple-400 transition-colors"
        >
          <span className="font-gothic">Acerca de</span>
        </button>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black/50 backdrop-blur-sm border-t border-purple-900 py-6">
    <div className="container mx-auto px-4 text-center text-gray-400">
      <p className="font-gothic">
        Las cartas esperan revelarte sus secretos...
      </p>
      <p className="text-sm mt-2">© {new Date().getFullYear()} Tarot Místico</p>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
export { Navbar, Footer };
