/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        "poppins-regular": "Poppins-Regular",
        "poppins-bold": "Poppins-Bold",
        "poppins-italic": "Poppins-Italic",
        "poppins-light": "Poppins-Light",
        "poppins-boldItalic": "Poppins-BoldItalic",
        "poppins-black": "Poppins-Black",
      },
    },
  },
  plugins: [],
};
