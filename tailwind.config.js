/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{pug,jade, html}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
