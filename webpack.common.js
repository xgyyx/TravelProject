'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // HTML打包插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清楚无用dist文件目录插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir)
};

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  // resolve下的extengsions为匹配后缀优先级的配置， alias为webpack解析路径的别名配置
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].[hash].css' //放到dist/css/下
    })
  ],
  // 处理不同类型文件的loader匹配规则
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.css/,
        include: [resolve('src')],
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('dist/img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('dist/media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('dist/fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}