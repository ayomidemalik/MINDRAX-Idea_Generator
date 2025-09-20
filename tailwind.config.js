/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lexend)'],
        display: ['var(--font-anton)'],
      },
      colors: {
        slogan: {
          1: '#FFFFFF',
          2: '#F5F5F5',
          3: '#EBEBEB',
          4: '#E0E0E0',
          5: '#D6D6D6',
          6: '#CCCCCC',
          7: '#C2C2C2',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slogan-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(180deg)' },
          '100%': { transform: 'translateY(0) rotate(360deg)' },
        },
        highlightWord: {
          '0%, 100%': {
            color: 'currentColor',
          },
          '50%': {
            color: '#c084fc',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slogan-in': 'slogan-in 1s ease-out forwards 0.5s',
        float: 'float 20s infinite linear',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}