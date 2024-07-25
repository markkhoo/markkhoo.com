/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'win-xp-blue': '#0831d9'
      },
      fontFamily: {
        'win-xp': ['Tahoma', 'Noto Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};
