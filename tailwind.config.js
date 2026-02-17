/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],//tailwind will be tracked in these extensioned files
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
