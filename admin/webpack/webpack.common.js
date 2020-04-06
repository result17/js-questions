const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../index.tsx'),
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'js-quiz',
      template: path.resolve('..', 'public', 'index.html'),
      filename: './index.html',
      favicon: path.resolve('..', 'public', 'favicon.png'),
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css' 
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        /*
        If you want to speed up compilation significantly you can set this flag. However, 
        many of the benefits you get from static type checking between different dependencies in your application will be lost.
        */
        transpileOnly: false,
        getCustomTransformers: () => ({
          // antd 按需加载
          before: [tsImportPluginFactory(
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: "css"
            }
          )]
        }),
        compilerOptions: {
          // 此选项会覆盖tsconfig.json的设置不建议在这里设置
          module: 'esnext'
        }
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 500,
          outputPath: 'imgs/'
        }
      }]
    }, {
      test: /\.mp3$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    }]
  },
  output: {
    path: path.resolve(__dirname, '..', 'output'),
    filename: devMode ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
    chunkFilename: devMode ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      // 打包n依赖
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}