/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/React files in src/
    "./public/index.html", // Include static HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
