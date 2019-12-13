module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns: 'usage', 根据 package.json 中的 browserslist 来按需引用 polyfill
        useBuiltIns: 'entry', // or 'entry'
        corejs: 3
      }
    ]
  ],
  plugins: [
    // must install `babel-plugin-transform-vue-jsx` and `babel-plugin-syntax-jsx`
    'babel-plugin-transform-vue-jsx',
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     corejs: false, // 默认值 false
    //     helpers: true, // 默认值 true
    //     regenerator: false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
    //     useESModules: true, // 使用 es modules helpers, 减少 commonJS 语法代码
    //   }
    // ],
    // element-ui import
    ['babel-plugin-component', { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }],
    // can use `import()`
    '@babel/plugin-syntax-dynamic-import',
  ],
}
// 可以在配置中使用包名称的简写形式（删除preset-、plugin-或babel-plugin）