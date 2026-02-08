/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aire: {
          bg: '#F5F2EB',
          paper: '#EBE7DE',
          text: '#2C2A26',
          stone: '#A8A29E',
          dark: '#1A1918',
          moss: '#282c26',
          earth: '#4a453e',
          clay: '#DCD8D0',
          linen: '#F9F7F5'
        }
      },
      transitionTimingFunction: {
        'aire-smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'slide-up-slow': 'slideUpSlow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        slideUpSlow: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
