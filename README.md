# webpack-vue-config
开发vue项目的webpack配置

## webpack 和 gulp 的区别

> 都是自动化构建工具，用来提高效率，可单独使用，也可以一起用

1. gulp是工具链、构建工具,可以配合各种插件做js压缩,css压缩,less编译 **替代手工实现自动化工作**   ，通过配置一系列的task，定义task处理的事务、执行顺序，来让gulp执行这些task，从而构建项目的整个前端开发流程。`简单说就一个Task Runner`
   - 构建工具
   - 自动化
   - 提高效率
2. webpack是文件打包工具,可以把项目的各种js文、css文件等打包合并成一个或多个文件,**主要用于模块化方案，预编译模块的方案**，更侧重于模块打包，通过loader(加载器)和plugins(插件)，打包成符合生产环境部署的前端资源。`模块打包工具`
   - 打包工具
   - 模块化识别
   - 一般用于开发单页面应用(SPA)

## webpack安装

1. 全局安装

   ```
   npm install webpack -g
   ```

2. 项目本地安装

   ```
   npm install webpack --save-dev
   ```

## webpack插件

1. webpack-dev-server

   - package.json

     ```
     "dev": "webpack-dev-server --config webpack.develop.config.js --hot --inline --progress --colors --open --port 9999 --content-base src"
     ```

     - --inline：自动刷新
     - --hot：热加载
     - --open：自动打开浏览器
     - --port：指定监听端口
     - --host：指定ip地址，默认127.0.0.1（localhost）
     - -content-base src：指定以src为根目录开启一个服务器

2. 自动生成html文件，html-webpack-plugin

   ```
   npm install html-webpack-plugin --save-dev
   ```

   ​

## webpack loader

> loader：预处理器。在js代码执行之前需要执行的一些处理。

1. css-loader	style-loader css-loader

   ```
   npm install style-loader css-loader --save-dev
   ```

2. less-loader      less less-loader

   ```
   npm install less less-loader --save-dev
   ```

3. sass-loader     node-sass sass-loader

   ```
   npm install node-sass sass-loader --save-dev
   ```

4. url-loader       file-loader url-loader

   ```
   npm install file-loader url-loader --save-dev
   ```

5. babel-loader     babel-core babel-loader babel-preset-es2015 babel-plugin-transform-runtime

   ```
   npm install babel-core babel-loader babel-preset-es2015 babel-plugin-transform-runtime --save-dev
   ```

6. vue-loader     vue-loader vue-template-compiler

   ```
   npm install vue-loader vue-template-compiler  --save-dev
   ```

   ​