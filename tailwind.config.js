/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      brand1: '#2A5198',
      brand2: '#FDB515',
      brand3: '#00AEEF',
    },
    backgroundImage: {
      'hero-image': "url('/src/assets/hero.jpg')",
    },
  },
};
export const plugins = [];
