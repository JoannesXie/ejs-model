const content = require('./content.ejs')
const layout = require('@/layout/index')
const head = ''
module.exports = layout.init({
  pageTitle: '错误页面',
  head: head
}).run(content({
  env: global.env === 'development' ? 'dev' : '',
  publicPath: global.publicPath
}))
