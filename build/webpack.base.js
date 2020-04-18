const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //html插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css打包插件
const TerserJSPlugin = require("terser-webpack-plugin"); //js压缩插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css压缩插件
const glob = require("glob");
let setMAP = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];
  //获取当前目录下匹配 "./src/views/*/index.js" 的文件目录
  const entryFiles = glob.sync(path.join(__dirname, "../src/views/*/index.js"));
  entryFiles.forEach((v) => {
    const Match = v.match(/src\/views\/(.*)\/index\.js/); //获取文件夹名
    const pageName = Match && Match[1];
    entry[pageName] = v; //设置entry
    //设置多个html插件
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: v.replace("index.js", "index.ejs"),
        filename: `${pageName}/index.html`,
        chunks: [pageName],
        favicon: path.resolve(__dirname, "../favicon.ico"), //生成一个icon图标
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
      })
    );
  });
  return {
    entry,
    HtmlWebpackPlugins,
  };
};
const { entry, HtmlWebpackPlugins } = setMAP();
module.exports = {
  entry: entry,
  output: {
    filename: "static/js/[name].[hash:6].js",
    path: path.resolve(__dirname, "../dist"),
    // publicPath: "../"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash:6].css",
    }),
  ].concat(HtmlWebpackPlugins),
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
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 使用 此插件loader替换 style-loader
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
        // use:'file-loader'
        use: {
          loader: "url-loader",
          options: {
            limit: 200 * 1024, //200k
            name: "static/img/[name].[hash:6].[ext]",
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader", //html中引入图片
      },
      //文件
      {
        // 文件解析
        test: /\.(eot|woff|ttf|woff2|appcache|mp4|pdf)(\?|$)/,
        loader: "file-loader",
        exclude: /node_modules/,
        query: {
          // 这么多文件，ext不同，所以需要使用[ext]
          name: "static/files/[name].[hash:6].[ext]",
        },
      },
      // ejs模板
      { test: /\.ejs$/, exclude: /node_modules/, use: ["ejs-loader"] },
    ],
  },
};
