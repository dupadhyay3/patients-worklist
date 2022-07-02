/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['outline-none'],
  theme: {
    extend: {
      colors: {},
      boxShadow: {
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
        normal: '0 0 1rem rgb(0 0 0 / 10%)',
      },
      zIndex: {
        5: '5',
        2: '2',
        1: '1',
        0: '0',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
