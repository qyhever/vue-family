/**
 * 开发阶段配置文件
 */
const path = require('path');
const webpack = require('webpack');
const htmlWP = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    devServer: {
        //注意：不写hot: true,colors:true，progress:true等，webpack2.x已不支持这些
        inline:true, // 默认是true
        host: '127.0.0.1',
        port: 8090,
        historyApiFallback: true,
    },
    module: {
    	rules: [
        // 解析vue文件
        {
            test: /\.vue$/,
            use: 'vue-loader'
        },
        // js文件es6转es5
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },
        // 处理在js中引用css文件
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        // 处理在js中引用less文件
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },
        // 处理在js中引用scss文件
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        // 处理图片，25K是临界值，小于limit值转换成base64字符串内嵌到js代码中,大于limit值的图片转成URL进行网络请求
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: 'url-loader?limit=25000&name=images/[name].[ext]'
        },
        // 处理iconfont
        {
            test: /\.(eot|woff|ttf|woff2|svg)$/,
            use: 'url-loader?limit=2500&name=fonts/[name].[ext]'
        }
    ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
		new htmlWP({
            title: '首页', // 生成的页面标题
            filename: 'index.html', // webpack-dev-server在内存中生成的文件名称，自动将build.js注入到这个页面底部
            template: 'index.html' // 根据工程根目录下的index.html这个模板来生成
        })
    ]
}