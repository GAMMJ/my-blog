// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- 이렇게 변경
    autoprefixer: {},
  },
};