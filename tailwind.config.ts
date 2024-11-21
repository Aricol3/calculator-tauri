// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'data-[current=true]:bg-foreground',
    'data-[current=true]:bg-primary',
    'data-[current=true]:bg-secondary',
    'data-[current=true]:bg-success',
    'data-[current=true]:bg-warning',
    'data-[current=true]:bg-danger',
    'data-[current=true]:border-foreground',
    'data-[current=true]:border-primary',
    'data-[current=true]:border-secondary',
    'data-[current=true]:border-success',
    'data-[current=true]:border-warning',
    'data-[current=true]:border-danger',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};