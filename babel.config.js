module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns，根据 package.json 中的 browserslist 来确定是否转换新语法和按需引用 polyfill
        useBuiltIns: 'usage', // or 'usage'
        corejs: 2
      }
    ]
  ],
  plugins: [
    'transform-vue-jsx',
    '@babel/plugin-transform-runtime',
    ['component', { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }],
    '@babel/plugin-syntax-dynamic-import',
    
  ],
  // env: {
  //   development:{
  //     plugins: ['dynamic-import-node']
  //   }
  // }
  /*
    @babel/plugin-transform-runtime: 开发环境使用
    @babel/runtime-corejs2: 生产环境使用
  */
}
// 可以在配置中使用包名称的简写形式（删除preset-、plugin-或babel-plugin）