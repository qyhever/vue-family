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
        // 解析vue文件，vue-loader会把vue文件转成js
        {
            test: /\.vue$/,
            use: 'vue-loader'
        },
        // js文件es6转es5
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/ // 排除node_modules目录
        },
        // 处理在js中引用css文件
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            //也可以写成 loader："style-loader!css-loader!postcss-loader"
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
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            // use: 'url-loader?limit=25000&name=images/[name].[ext]'
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'images/[name].[ext]?[hash]'
            }
            // 小于limit的数值，会被改写成base64填入url里面，
            // 不然会输出到dist/images目录下，[name]原文件名，[ext]原后缀，[hash]在url上加上一点哈希值避免缓存。
        },
        // 处理iconfont
        {
            test: /\.(eot|woff|ttf|woff2|svg)$/,
            use: 'url-loader?limit=2500&name=fonts/[name].[ext]?[hash]'
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