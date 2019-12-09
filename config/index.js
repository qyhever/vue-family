const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'public',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost',
    port: 10010,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    useEslint: true,
    // https://www.webpackjs.com/configuration/devtool/
    devtool: 'cheap-module-eval-source-map',
    showEslintErrorsInOverlay: false,
    cssSourceMap: true
  },
  build: {
    index: path.resolve(__dirname, '../public/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'public',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: 'source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // `npm run build --report`
    bundleAnalyzerReport: process.env.npm_config_report || false,
    // `npm run build --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false,
    // `npm run build --preview`
    preview: process.env.npm_config_preview || false
  }
}