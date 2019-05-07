// 全局配置，比如 HTML 文件的路径、publicPath 等

const path = require('path')

// __dirname是当前文件所在目录，process.cwd()是node当前工作的目录，即package.json所在目录

const PROJECT_PATH = process.cwd() // 项目目录
var COMPRESS = process.env.COMPRESS !== undefined ? process.env.COMPRESS : true // 可通过 package.json 命令行 COMPRESS 控制 用于 压缩与哈希
COMPRESS = COMPRESS === 'false' ? false : true

const config = {
  PROJECT_PATH, // 项目目录
  CONFIG_PATH: path.join(__dirname), // 配置文件目录
  SRC_PATH: path.join(PROJECT_PATH, './src/'), // 源文件目录
  BUILD_NAME: "./dist/",
  BUILD_PATH: function() { //可通过 package.json 命令行 BUILD_PATH 控制打包目录
    return path.join(PROJECT_PATH, process.env.BUILD_PATH ? process.env.BUILD_PATH : this.BUILD_NAME) // 打包目录
  },
  PUBLIC_PATH: path.join(PROJECT_PATH, './src/assets/'), // 静态文件存放目录
  PAGE_PATH: path.join(PROJECT_PATH, './src/pages/'),
  VENDORS_PATH: path.join(PROJECT_PATH, './src/vendors/'), // vendors目录
  NODE_MODULES_PATH: path.join(PROJECT_PATH, './node_modules/'), // node_modules目录
  ignorePages: ['test_kl'], // 标识没有入口js文件的html

  /* 生成二维码 */
  QRcode: {
    
  },

  /* 以下为使用配置 */
  devPort: '8080',
  devIndex: '/views/common/error_404', // 开启dev后自动打开的网址
  useEslint: false, // 是否使用esLint监控代码
  publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/', // 打包链接前缀 可通过 package.json 命令行 PUBLIC_PATH 控制

  compressHtml: COMPRESS, // 压缩html 
  compressJs: COMPRESS, // 压缩js 
  hash: COMPRESS, // 哈希开启 

  devProxy: { // 可以通过proxy代理其他服务器的api
    // "/api": "http://localhost:3000"
  }
}

module.exports = config
