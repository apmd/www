const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dist = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
    // siteHeader: './src/siteHeader.js',
  },
  output: {
    path: dist,
  },
  plugins: [new MiniCssExtractPlugin({
    filename: "[name].css"
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /main.css/,
        // include: path.resolve(__dirname, 'src'),
        use: ['css-loader', 'postcss-loader'],
      },
      {
        test: /main.css/,
        // include: path.resolve(__dirname, 'src'),
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
    ],
  },
}
