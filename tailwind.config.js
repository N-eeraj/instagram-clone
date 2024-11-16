/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          button: "#0095f6",
          text: "#f5f5f5",
        },
        secondary: "#121212",
        link: "#e0f1ff",
        separator: "#363636",
      },
    },
  },
  plugins: [],
}
