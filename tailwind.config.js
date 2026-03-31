/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14151B',
        surface: '#1E1F29',
        accent: '#9F83F1',
        cyan: '#46C7D9',
        pink: '#DF74B8',
        background: '#DFE2F2',
        text: '#FFFFFF',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        drama: ['Newsreader', 'serif'],
        data: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
