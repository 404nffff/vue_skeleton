module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
     themes: ['cmyk'], // 启用暗黑主题
     styled: true,
     base: true,
     utils: true,
     logs: true,
     rtl: false,
  },
}
