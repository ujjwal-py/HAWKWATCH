/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#9C27B0',
        background: '#000000',
        card: '#1f2937',
        border: '#374151',
      },
    },
  },
  plugins: [],
}