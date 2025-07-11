import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        wine: {
          light: '#7A3E45',
          DEFAULT: '#591C21',
          dark: '#3A1216',
        },
        gold: {
          light: '#E9D07E',
          DEFAULT: '#D4AF37',
          dark: '#B39129',
        },
        cream: {
          light: '#FFFBF2',
          DEFAULT: '#FFFFF',
          dark: '#E8E0C7',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Work Sans', 'sans-serif'],
      },
      height: {
        'screen-90': '90vh',
      },
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://res.cloudinary.com/dglghqker/image/upload/v1746209308/1_work_with_horse_jogorn.jpg')",
        'about-pattern':
          "linear-gradient(rgba(89, 28, 33, 0.85), rgba(89, 28, 33, 0.85)), url('https://res.cloudinary.com/dglghqker/image/upload/v1746210697/Savio_Soares_1_ihqqvv.jpg')",
      },
    },
  },
  plugins: [],
}

export default config
