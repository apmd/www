/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./www/**/*.{html,js}'],
  },
  theme: {
    extend: {
      padding: {
        site: '10%',
      }
    },
  },
  plugins: [],
}

