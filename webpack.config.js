const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // HTML打包插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清楚无用dist文件目录插件
const ManifestPlugin = require('webpack-manifest-plugin'); // 在生成的dist文件目录中插入manifest.json文件，描述webpack依赖路径

// 封装path方法
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('src/img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('src/media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('src/fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}