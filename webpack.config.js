const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // new webpack.ProvidePlugin({
    //   $ : 'jquery',
    //   'jQuery' : 'jquery',
    //   'window.jQuery' : 'jquery'
    // }),
  ],
  devServer: {
    hot: true,
    allowedHosts: [
      '196.121.131.40'  
      //  '196.131.3.117:64372'
      // '196.131.5.48:64372'
    ],
    proxy: {
      "/uums_mgr": {
        target: "http://196.123.134.40/",
        // target: "http://196.131.3.117:64372/",
        // target: "http://196.131.5.48:64372/",
        pathRewrite: { "^/uums_mgr": "/uums_mgr" },
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, './src/components/'),
      assets: path.join(__dirname, './src/assets/')
    },
    extensions: ['.js', '.vue', '.json']
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
      },
      { 
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}
