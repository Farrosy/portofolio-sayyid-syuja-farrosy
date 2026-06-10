/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./*.{html,js}",
    "./src/**/*.{css,js}" // <-- TAMBAHKAN BARIS INI
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}