import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#f0f9ff',
        menu_bg: '#E0FFFF',
        primary: '#008080',
        secondary: '#7FFFD4',

      },
      fontFamily:{
        'open-sans': ['Open Sans',' sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config

