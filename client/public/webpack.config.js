const path = require('path')
var webpack = require('webpack');


module.exports = {
  entry: './src/my-app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
          'file-loader',
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true
          }
         },
        ],
      },
    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: [':data-src']
        }
      }
    }
  ]
  }
}
