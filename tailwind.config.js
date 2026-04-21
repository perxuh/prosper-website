/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0d14',
        surface: '#13161f',
        accent: '#2B2BAA',
        cyan: '#8888ee',
        pink: '#4040cc',
        background: '#0a0d14',
        text: '#eef0f8',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        drama: ['Playfair Display', 'Georgia', 'serif'],
        data: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
