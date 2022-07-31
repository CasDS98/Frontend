module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {

      gridTemplateRows: {
        // Simple 16 column grid
        'message': '100px 1fr 75px',
      }
    },
  },
  variants: {
    scrollbar: ['dark'],
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
