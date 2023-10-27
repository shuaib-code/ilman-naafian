/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    fontFamily:{
      mono: ['Roboto Mono', 'monospace'],
      hindi: ['Hind Siliguri', 'sans-serif'],
      slab: ['Roboto Slab', 'serif']
    },
    extend: {
      colors: {
        'green':'#72BD76',
        'gray':'#F8F8F8',
        'yellow':'#FFFCF7'
      }
    },
  },
  plugins: [require("daisyui")],
}

