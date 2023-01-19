/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cp': {
          1: "#FBFBF2",
          2: "#E5E6E4",
          3: "#F1F2F6",
          4: "#34CB78",
          5: "#194B71",
          6: "#CD5334",
        },
      },
    },
  },
  plugins: [],
};
