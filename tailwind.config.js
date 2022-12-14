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
          3: "#CFD2CD",
          4: "#A6A2A2",
          5: "#847577",
        },
      },
    },
  },
  plugins: [],
};
