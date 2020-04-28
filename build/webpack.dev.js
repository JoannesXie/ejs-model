let { smart } = require("webpack-merge");
let base = require("./webpack.base");
const path = require("path");

module.exports = smart(base, {
  mode: "development",
  devServer: {
    port: 8888, //端口
    open: true,
    openPage: "index/index.html",
    // 本地服务将从哪个目录去查找静态内容文件
    contentBase: path.resolve(__dirname, "../src"),
    overlay: true, // 编译出现错误时，将错误直接显示在页面上
    quiet: true, // 不输出无用信息
  },
  devtool: "source-map",
  plugins: [],
});
