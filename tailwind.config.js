/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          900: '#0b1329',
          950: '#060a17',
        }
      }
    },
  },
  plugins: [],
}
