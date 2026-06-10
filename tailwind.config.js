/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F2F2F7",
          dark: "#000000",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#1C1C1E",
        },
        peptide: "#007AFF", // Native iOS Blue
        medication: "#5856D6", // Native iOS Indigo/Teal vibe? Let's use 30B0C7 for teal
        teal: "#30B0C7",
        glp1: "#FF2D55", // Native iOS Rose
      },
    },
  },
  plugins: [],
};
