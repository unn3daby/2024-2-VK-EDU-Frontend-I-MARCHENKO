'use strict';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve, join } from 'path';

const __dirname = resolve();

const SRC_PATH = resolve(__dirname, 'src');
const BUILD_PATH = resolve(__dirname, 'build');

const config = {
  module: {
    rules: [
      {
        use: [
          {
            options: {
              presets: ['@babel/preset-env'],
            },
            loader: 'babel-loader',
          },
        ],
        include: SRC_PATH,
        test: /\.js$/,
      },
      {
        use: [
          {
            loader: 'css-loader',
          },
        ],
        test: /shadow\.css$/,
        include: SRC_PATH,
      },
      {
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
        test: /index\.css$/,
        include: SRC_PATH,
      },
      {
        use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.s(a|c)ss$/,
        include: SRC_PATH,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
    ],
    strictExportPresence: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: join(SRC_PATH, 'public', 'index.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: {
      directory: join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_PATH,
  },
  resolve: {
    alias: {
      '@': join(SRC_PATH),
    },
  },
  entry: {
    index: join(SRC_PATH, 'app', 'init.js'),
  },
  mode: 'development',
  context: SRC_PATH,
};

export default config;
