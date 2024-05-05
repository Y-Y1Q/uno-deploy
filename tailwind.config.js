/** @type {import('tailwindcss').Config} */
export default {
  content: ["./unogame/frontendV2/views/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
