/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    autoprefixer: {
      grid: true,
      overrideBrowserslist: ['last 5 versions', 'not ie > 0', 'not ie_mob > 0'],
      cascade: true,
    },
  },
};

export default config;
