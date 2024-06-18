/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#201F22",
        "dark-el-1": "#282221",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
