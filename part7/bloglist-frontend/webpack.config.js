const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
  // Production url not yet implemented, both urls here as a placeholder
  const backend_url = argv.mode === 'production'
    ? 'http://localhost:3003/api'
    : 'http://localhost:3003/api'

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      proxy: {
        '/api': 'http://localhost:3003',
      },
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      })
    ]
  }
}
module.exports = config