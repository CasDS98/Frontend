module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {

      gridTemplateRows: {
        'message': '100px 1fr 75px',
        'members': '1fr 100px 1fr',
      },

      height: theme => ({
        "screen-custom": "87vh",
      }),
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
