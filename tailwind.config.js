/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
   content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
      extend: {
          colors: {
              'primary': '#4AFF93',
              'primaryhover': '#D3FFB7',
              'secondary': '#1A232E',
              'dark': '#1f2937',
              'light': '#f3f4f6',
          }
    },
  },
  plugins: [],
}

