const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#E6324B',
      gray: colors.coolGray,
      black: '#000',
      white: '#fff',
    },
    fontFamily: {
      sans: ['TT Norms Pro', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}