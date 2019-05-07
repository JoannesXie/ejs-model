// 基础配置文件，包含了不同环境通用配置

const path = require('path') // nodejs路径模块，用于读取路径
const config = require('./config.js') // 获取配置
const webpack = require('webpack') // 用于引用官方插件

const HTMLWebpackPlugin = require('html-webpack-plugin') // 用于生成html
const CopyWebpackPlugin = require('copy-webpack-plugin') // copy staticPublic
require('./QRcode') // 生成项目需要的二维码

const glob = require('glob')
global.env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
global.publicPath = config.publicPath
// 获取html文件名，用于生成入口
const getFileNameList = (path, src = '!(_)*/!(_)*') => {
  const globOptions = {
    cwd: path, // 在pages目录里找
    sync: true // 这里不能异步，只能同步
  }
  const globInstance = new glob.Glob(src, globOptions)
  const fileList = []
  globInstance.found.forEach(item => {
    fileList.push(item.split('.')[0])
  })
  return fileList
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// ESlint
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const htmlDirs = getFileNameList(config.PAGE_PATH)
const HTMLPlugins = [] // 保存HTMLWebpackPlugin实例
const Entries = {} // 保存入口列表

// 生成HTMLWebpackPlugin实例和入口列表
htmlDirs.forEach((page) => {
  const htmlConfig = {
    filename: `views/${page}/index.html`,
    template: path.join(config.PAGE_PATH, `./${page}/html.js`), // 模板文件
    minify: {
      removeComments: config.compressHtml, /* 删除注释*/
      collapseWhitespace: config.compressHtml /* 删除空格*/
    }
  }

  const found = config.ignorePages.findIndex((val) => {
    return val === page
  })

  if (found === -1) { // 有入口js文件的html，添加本页的入口js和公用js，并将入口js写入Entries中
    htmlConfig.chunks = [page, 'bundle/commons.bundle', 'bundle/bundle']
    Entries[page] = `./src/pages/${page}/index.js`
  } else { // 没有入口js文件，chunk为空
    htmlConfig.chunks = []
  }

  const htmlPlugin = new HTMLWebpackPlugin(htmlConfig)
  HTMLPlugins.push(htmlPlugin)
})

module.exports = {
  context: config.PROJECT_PATH, // 入口、插件路径会基于context查找
  entry: Entries,
  output: {
    path: config.BUILD_PATH(), // 打包路径，本地物理路径
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.scss'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.useEslint ? [createLintingRule()] : []),
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [config.SRC_PATH],
        exclude: [config.VENDORS_PATH], // 忽略第三方的任何代码
        use: [{ // 导入字体文件，并最打包到output.path+ options.name对应的路径中
          loader: 'file-loader',
          options: {
            name: 'static/fonts/[name].[ext]'
          }
        }]
      }, {
        test: /\.js$/,
        include: [config.SRC_PATH],
        exclude: [config.VENDORS_PATH, config.NODE_MODULES_PATH],
        use: ['babel-loader']
      }, {
        test: /\.ejs$/,
        include: [config.SRC_PATH],
        exclude: [config.VENDORS_PATH, config.NODE_MODULES_PATH],
        loader: 'ejs-loader'
      }
    ]
  },
  plugins: [
    ...HTMLPlugins, // 扩展运算符生成所有HTMLPlugins
    new webpack.optimize.CommonsChunkPlugin({
      name: 'bundle/bundle', // 需要注意的是，chunk的name不能相同！！！
      filename: 'static/js/[name].js',
      minChunks: 3
    }),
    new webpack.optimize.CommonsChunkPlugin({ // 抽取公共chunk
      name: 'bundle/commons.bundle', // 指定公共 bundle 的名称。HTMLWebpackPlugin才能识别
      filename: 'static/js/[name].js'
    }),
    new CopyWebpackPlugin([{ // copy文件
      from: resolve('public'),
      to: config.BUILD_PATH(),
      ignore: ['_*']
    }]),
    new CopyWebpackPlugin([{ // copy文件
      from: resolve('src/vendor'),
      to: config.BUILD_PATH() + '/static/vendor',
      ignore: ['_*']
    }])
  ]
}
