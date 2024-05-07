const path = require('path')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const asset = path.resolve(dist, 'asset');
const img = path.resolve(asset, 'img');
// const public = path.resolve(__dirname, 'public');
const filename = '[name].[contenthash:8]';

module.exports = (env, argv) => {
  const { mode } = argv;
  return {
    mode,
    // entry: {
    //   main: './src/main.js',
    //   // siteHeader: './src/siteHeader.js',
    // },
    devtool: mode !== 'production' && 'eval',
    stats: {
      errorDetails: true,
    },
    output: {
      path: dist,
      clean: true,
      chunkFilename: filename + '.js',
      // filename: filename + '[ext]',
    },
    plugins: [
      new webpack.EnvironmentPlugin(['npm_package_version']),
      // new MiniCssExtractPlugin({
      //   filename: "[name].css"
      // }),
      // new webpack.IgnorePlugin({ resourceRegExp: /\.html$/i }),
      new HtmlBundlerPlugin({
        entry: 'src',
        entryFilter: {
          includes: [/\.s?html$/],
          // excludes: [/element/],  // except partial files
        },
        filename: '[name][ext]',
        // entry: {
        //   en: 'src/en/index.html',
        //   // th: 'src/th/index.html'
        // },
        js: {
          filename: filename + '.js',
          outputPath: asset,
        },
        css: {
          test: /asset\/\w+\.css$/,
          filename: filename + '.css',
          outputPath: asset,
          // inline: true,
        },
        loaderOptions: {
          sources: [{
            tag: 'css'
          }],
          sources: [
            {
              tag: 'link',
              // attributes: ['hreflang', 'rel', 'stylesheet'],
              filter: ({ attributes: { rel } }) => {
                return !rel.includes('alternate');
              },
            },
          ],
        },
      }),
      new CopyPlugin({
        // context: 'src',
        patterns: [
          // {
          //   from: "**/*",
          //   to: "relative/path/to/dest/",
          // },
          // {
          //   from: "**/*",
          //   to: "/absolute/path/to/dest/",
          // },
          {
            from: "asset/img/logo.svg",
            to: img,
            // to: dist + "/[path][name][ext]",
            context: src
          },
          {
            from: "**/*.json",
            to: dist + "/[path][name][ext]",
            context: src
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s?html$/i,
          use: [
            HtmlBundlerPlugin.loader,
          ]
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          generator: {
            filename: filename + '[ext]',
            outputPath: 'asset/img',
          },
        },
        {
          test: /\.css$/i,
          // exclude: /main.css/,
          // include: path.resolve(__dirname, 'src'),
          use: [
            // 'style-loader',
            // MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ],
        },
        // {
        //   test: /.*main.css/i,
        //   use: [
        //     'css-loader',
        //     'postcss-loader',
        //   ]
        // }
        // {
        //   test: /main.css/,
        //   // include: path.resolve(__dirname, 'src'),
        //   use: [
        //     // 'style-loader',
        //     // MiniCssExtractPlugin.loader,
        //     'css-loader',
        //     'postcss-loader'
        //   ],
        // },
      ],
    },
  };
}
