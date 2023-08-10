/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand1: '#2A5198',
        brand2: '#FDB515',
        brand3: '#00AEEF',
      },
      backgroundImage: {
        'hero-image': "url('./src/assets/hero.jpg')",
      },
    },
  },
  plugins: [],
}
