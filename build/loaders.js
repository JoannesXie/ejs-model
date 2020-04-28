const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css打包插件
const path = require("path");
const loaders = [
  //JS
  {
    test: /\.js$/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [
          [
            "@babel/plugin-proposal-decorators",
            {
              legacy: true,
            },
          ],
          [
            "@babel/plugin-proposal-class-properties",
            {
              loose: true,
            },
          ],
        ],
      },
    },
    exclude: /node_modules/,
  },
  // css
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      "css-loader",
      "postcss-loader",
    ],
    // postcss和autoprefixer 已经在postcss.config.js和packge.json中配置过
    exclude: /node_modules/,
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        // options: {
        //   publicPath: "../../", // 处理css中图片路径问题
        // },
      }, // 使用 此插件loader替换 style-loader
      "css-loader",
      "postcss-loader", // 使用 此loader自动给css添加浏览器样式
      "sass-loader", // 把 scss => css
    ],
    exclude: /node_modules/,
  },
  // 图片
  {
    test: /\.(png|jpg|jpeg|gif)$/,
    //当图片小于多少k时，转为base64，否则使用file-loader导出
    // use: "file-loader",
    use: {
      loader: "url-loader",
      options: {
        limit: 200 * 1024, //200k
        name: "img/[name].[hash:6].[ext]",
        publicPath: "../",
      },
    },
    exclude: /node_modules/,
  },
  // ejs模板
  { test: /\.ejs$/, exclude: /node_modules/, use: ["ejs-loader"] },
  {
    test: /\.html$/,
    exclude: /node_modules/,
    loader: "html-loader", //html中引入图片
  },
  //文件
  {
    // 文件解析
    test: /\.(eot|woff|ttf|woff2|appcache|mp4|pdf)(\?|$)/,
    loader: "file-loader",
    exclude: /node_modules/,
    query: {
      // 这么多文件，ext不同，所以需要使用[ext]
      name: "files/[name].[hash:6].[ext]",
      publicPath: "../",
    },
  },
];

module.exports = loaders;
