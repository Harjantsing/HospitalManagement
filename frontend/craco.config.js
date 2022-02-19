// craco.config.js

{
  webpack: {
    plugins: {
      add: [
        new webpack.DefinePlugin({
          process: {env: {}}
        })
      ]
    }
  }
}

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
