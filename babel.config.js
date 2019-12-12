module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns: 'usage', 根据 package.json 中的 browserslist 来按需引用 polyfill
        useBuiltIns: 'usage', // or 'entry'
        corejs: 2
      }
    ]
  ],
  plugins: [
    // must install `babel-plugin-transform-vue-jsx` and `babel-plugin-syntax-jsx`
    'babel-plugin-transform-vue-jsx',
    '@babel/plugin-transform-runtime',
    // element-ui import
    ['babel-plugin-component', { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }],
    // can use `import()`
    '@babel/plugin-syntax-dynamic-import',
  ],
}
// 可以在配置中使用包名称的简写形式（删除preset-、plugin-或babel-plugin）