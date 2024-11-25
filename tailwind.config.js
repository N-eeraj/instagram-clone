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
          button: {
            DEFAULT: "#0095f6",
            hovered: "#1877f2",
          },
          text: "#f5f5f5",
        },
        secondary: "#121212",
        link: "#e0f1ff",
        separator: {
          light: "#555555",
          dark: "#363636",
        },
      },
    },
  },
  plugins: [],
}
