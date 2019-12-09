module.exports = {
  plugins: {
  	'postcss-import': {},
    'postcss-url': {},
    // postcss-cssnext 已具备 autoprefixer 功能，在 package.json 的 browserslist 字段配置
    'postcss-cssnext': {}
  }
}