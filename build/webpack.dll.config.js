const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      // 'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../public/dll'),
    filename: '[name].dll.js',
    library: '[name]_dll' // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.resolve(__dirname, '../public/dll/mainfist.json')
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin()
  ]
}