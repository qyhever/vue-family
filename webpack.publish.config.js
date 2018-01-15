/**
 * 发布阶段配置文件
 */
const path = require('path');
const webpack = require('webpack');
const htmlWP = require('html-webpack-plugin');
// 删除文件夹
const CleanPlugin = require('clean-webpack-plugin');
// 分离css插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 分离引入的css（less，scss）
const ExtractRootCss = new ExtractTextPlugin({
    filename: 'root.css',
    allChunks: false
});
// 分离vue文件内样式
const ExtractVueCss = new ExtractTextPlugin({
    filename: 'style/[name]/style.css',
    allChunks: true
});
// css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/main.js'),
        // 需要分离的第三方包名写在数组中
        vendors: ['vue', 'vue-router', 'axios']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [
            // 解析vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // vue文件内样式提取
                options: {
                    // 这里使用ExtractVueCss
                    loaders: {
                        'css': ExtractVueCss.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                            // vue-style-loader是vue-loader的依赖,使用npm3以上，则不需要显式安装
                        }),
                        'less': ExtractVueCss.extract({
                            use:['css-loader','less-loader'],
                            fallback: 'vue-style-loader'
                        }),
                        'scss': ExtractVueCss.extract({
                            use:['css-loader','sass-loader'],
                            fallback: 'vue-style-loader'
                        }),
                    }
                }
            },
            // js文件es6转es5
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // 处理在js中引用css文件 + 分离css
            {
                test: /\.css$/,
                use: ExtractRootCss.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // 处理在js中引用less文件 + 分离css
            {
                test: /\.less$/,
                // use: ['style-loader', 'css-loader', 'less-loader']
                use: ExtractRootCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','less-loader']
                })
            },
            // 处理在js中引用scss文件 + 分离css
            {
                test: /\.scss$/,
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: ExtractRootCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
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
        // 分离第三方包插件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        // html压缩
        new htmlWP({
            title: '首页',
            filename: 'index.html',
            template: 'index.html',
            // html代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        // 删除dist目录
        new CleanPlugin(['dist']),
        // js代码压缩,混淆
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }),
        // 3. 删除警告
        new webpack.DefinePlugin({
            'process.env': {
                // 注意字符串被引号引起来
                NODE_ENV: '"production"'
            }
        }),
        // 分离css文件
        // new ExtractTextPlugin('app.css'),
        ExtractVueCss, // 填入插件实例，vue内的css
        ExtractRootCss,// 填入插件实例，复用的css

        // css压缩
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.(css|less|scss)$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })

    ]
}