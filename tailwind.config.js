module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {

      gridTemplateColumns: {
        // Simple 16 column grid
        '1fr': 'repeat(3, 1fr)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
