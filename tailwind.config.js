/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary : '#EA0001',
        white: '#FFFFFF',
        black: '#000000',
        secondary: '#EC5300',
        gray: '#CCCCCC',
        notblack: '#606060',
        notwhite: '#E6E6E6',
        promo: '#005A09'
      },
      fontFamily : {
        'odin' : ['Odin-Bold', 'sans-serif'],
        'inter' : ['"Inter Regular"', 'sans-serif']
      }
    },
  },
  plugins: [
    
  ],
}

