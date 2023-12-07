/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "/TW/dist/output.css",
    "./src/**/*.{html, js, ts, css,scss}",
    "./src/**/*"
],
  theme: {
    extend: {},
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

