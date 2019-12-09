const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// hash 整个项目有文件更改就会更新
// chunkhash 根据入口文件、依赖关系构建对应的 chunk
// contenthash 针对文件内容级别

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    app: [
      resolve('src/main.js')
    ]
  },

  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    publicPath: config.build.assetsPublicPath
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env')
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: resolve('dist/index.html'),
      template: resolve('public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      templateParameters: {
        PUBLIC_URL: config.build.assetsPublicPath + config.build.assetsSubDirectory
      }
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
      // chunkFilename: utils.assetsPath('css/[id].[contenthash].css')
    }),
    /*
    使用文件路径的 hash 作为 moduleId。
    虽然我们使用 [chunkhash] 作为 chunk 的输出名，但仍然不够。
    因为 chunk 内部的每个 module 都有一个 id，webpack 默认使用递增的数字作为 moduleId。
    如果引入了一个新文件或删掉一个文件，可能会导致其他文件的 moduleId 也发生改变，
    那么受影响的 module 所在的 chunk 的 [chunkhash] 就会发生改变，导致缓存失效。
    因此使用文件路径的 hash 作为 moduleId 来避免这个问题。
    */
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*', 'index.html']
    }])
  ],
  optimization: {
    /*
    上面提到 chunkFilename 指定了 chunk 打包输出的名字，那么文件名存在哪里了呢？
    它就存在引用它的文件中。这意味着一个 chunk 文件名发生改变，会导致引用这个 chunk 文件也发生改变。

    runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
    这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
    */
    runtimeChunk: true,

    splitChunks: {
      /*
      默认 entry 的 chunk 不会被拆分
      因为我们使用了 html-webpack-plugin 来动态插入 <script> 标签，entry 被拆成多个 chunk 也能自动被插入到 html 中，
      所以我们可以配置成 all, 把 entry chunk 也拆分了
      */
      chunks: 'all'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.generateAnalyzerReport || config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

  if (config.build.bundleAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 10020,
        generateStatsFile: false
      })
    )
  }

  if (config.build.generateAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false
      })
    )
  }
}

module.exports = webpackConfig