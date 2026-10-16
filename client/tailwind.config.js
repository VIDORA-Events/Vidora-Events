/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          ivory: '#F8F5EF',
          white: '#FFFEFC',
          charcoal: '#252421',
          taupe: '#B8AA98',
          gold: '#B69A68',
          'gold-light': '#D4C3A3',
          'gold-dark': '#8E7348',
          olive: '#77786B',
          'olive-light': '#A1A392',
          border: 'rgba(184, 170, 152, 0.25)',
          'border-dark': 'rgba(37, 36, 33, 0.12)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.18em',
        'luxury-wide': '0.28em',
      },
      transitionTimingFunction: {
        'luxury-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
};

