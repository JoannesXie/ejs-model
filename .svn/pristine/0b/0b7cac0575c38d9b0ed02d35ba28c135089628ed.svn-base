const layout = require('./html.ejs') // 整个页面布局的模板文件，主要是用来统筹各个公共组件的结构

/* 整理渲染公共部分所用到的模板变量 */
var pf = {
  env: global.env === 'development' ? 'dev' : '',
  publicPath: global.publicPath,
  pageTitle: '',
  head: '',
  foot: '',
  navPar: '',
  navChild: ''
}

const moduleExports = {
  /* 处理各个页面传入而又需要在公共区域用到的参数 */
  init(opt) {
    pf = Object.assign(pf, opt)
    return this
  },
  /* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */
  run(content) {
    const componentRenderData = Object.assign({}, pf) // 页头组件需要加载css/js等，因此需要比较多的变量
    componentRenderData.content = content
    return layout(componentRenderData)
  }
}
module.exports = moduleExports
