const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //html插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css打包插件
const TerserJSPlugin = require("terser-webpack-plugin"); //js压缩插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css压缩插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理之前的dist
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 文件复制
module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
  },
  optimization: {
    //优化项
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: "async", // 三选一： "initial" | "all" | "async" (默认)
      minSize: 30000, // 最小尺寸，30K，development 下是10k
      maxSize: 0, // 文件的最大尺寸，0为不限制
      minChunks: 1, // 默认1，被提取的一个模块至少需要在几个 chunk 中被引用
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 正则规则，如果符合就提取 chunk
          priority: -10, // 缓存组优先级，当一个模块可能属于多个 chunkGroup，这里是优先级
        },
        default: {
          minChunks: 2,
          priority: -20, // 优先级
          reuseExistingChunk: true, // 如果该chunk包含的modules都已经另一个被分割的chunk中存在，那么直接引用已存在的chunk，不会再重新产生一个
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.ejs",
      filename: "index.html",
      favicon: "./favicon.ico",
      minify: {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "main.[hash:8].css",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      // {
      //   from: "./src/vendor",
      //   to: "vendor",
      // },
    ]),
  ],
  module: {
    rules: [
      //JS
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    corejs: 3,
                  },
                ],
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
        ],
        exclude: /node_modules/,
      },
      // css
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        // postcss和autoprefixer 已经在postcss.config.js和packge.json中配置过
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 使用 此插件loader替换 style-loader
          "css-loader",
          "postcss-loader", // 使用 此loader自动给css添加浏览器样式
          "sass-loader", // 把 scss => css
        ],
      },
      // 图片
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        //当图片小于多少k时，转为base64，否则使用file-loader导出
        // use:'file-loader'
        use: {
          loader: "url-loader",
          options: {
            limit: 200 * 1024, //200k
          },
        },
      },
      {
        test: /\.html$/,
        use: "html-loader", //html中引入图片
      },
      //文件
      {
        // 文件解析
        test: /\.(eot|woff|ttf|woff2|appcache|mp4|pdf)(\?|$)/,
        loader: "file-loader",
        query: {
          // 这么多文件，ext不同，所以需要使用[ext]
          name: "assets/[name].[hash:7].[ext]",
        },
      },
      // ejs模板
      { test: /\.ejs$/, use: ["ejs-loader"] },
    ],
  },
};
