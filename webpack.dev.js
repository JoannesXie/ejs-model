let { smart } = require("webpack-merge");
let base = require("./webpack.base");
const path = require("path");

module.exports = smart(base, {
  mode: "development",
  devServer: {
    port: 8088, //端口
    open: true,
    // 服务器将从哪个目录去查找内容文件
    contentBase: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  plugins: [],
});
