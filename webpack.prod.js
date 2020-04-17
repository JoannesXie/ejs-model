let { smart } = require("webpack-merge");
let base = require("./webpack.base");
const path = require("path");

module.exports = smart(base, {
  mode: "production",
});
