/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js, ts, css}",
    "./src/**/*"
],
  theme: {
    extend: {},
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

