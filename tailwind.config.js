/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blood: {
          500: '#ff0000',
          700: '#8a0303',
          900: '#4a0000',
        },
        void: {
          900: '#050505',
          800: '#121212',
          700: '#1a1a1a',
        },
        marble: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e5e5e5',
          800: '#2d2d2d',
          900: '#111111',
        },
      },
      fontFamily: {
        horror: ['"Cinzel Decorative"', 'cursive'],
        serif: ['"Spectral"', 'serif'],
        gothic: ['"Quattrocento"', 'serif'],
        accent: ['"MedievalSharp"', 'cursive'],
      },

      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
