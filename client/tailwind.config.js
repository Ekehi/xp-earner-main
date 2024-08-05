/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [    
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '6.4px',
    },
    extend: {
      backgroundImage: {
       'reg-section': "url('/public/images/8.jpg')",
      }
    }
  },

  variants: {
    extend: {
     backgroundImage: ['hover', 'focus'],
    }
  },

  plugins: [
    require('flowbite/plugin')
  ],
}
