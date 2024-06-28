module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './public/index.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
     themes: ['cmyk'],
     styled: true,
     base: true,
     utils: true,
     logs: true,
     rtl: false
  },
}
