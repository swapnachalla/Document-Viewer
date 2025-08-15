/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      maxWidth: {
        'xs': '20rem',
      }
    },
  },
  plugins: [],
}

