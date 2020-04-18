let { smart } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理之前的dist
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 文件复制
let base = require("./webpack.base");
const path = require("path");

module.exports = smart(base, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../src/vendor"),
        to: "vendor",
      },
    ]),
  ],
});
