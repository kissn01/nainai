const webpack = require('webpack')
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: 'nainai_启动页_发布文件', // 运行时生成的生产环境构建文件的目录(默认""dist""，构建之前会被清除)
  assetsDir: "", //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认"")
  indexPath: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  filenameHashing: true, // 是否生产文件名Hash
  pages: {
    //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      //除了 entry 之外都是可选的
      entry: "src/main.js", // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: "public/index.html", // 模板来源
      filename: "index.html", // 在 apiCloud/index.html 的输出
      title: "", // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ["chunk-vendors", "chunk-common", "index"] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    }
  },
  lintOnSave: false, // 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  devServer: {
    // 环境配置
    host: '0.0.0.0',
    hot: false,
    port: 8082,
    https: false,
    hotOnly: false,
    open: false, //配置自动启动浏览器
    disableHostCheck: true ,//外网映射
    proxy: {
      // 配置多个代理(配置一个 proxy: "http://localhost:4000" )
      "/api": {
        target: "http://192.168.1.3:70/7jingoa/public/index.php/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  chainWebpack: config => {
    // 配置jquery
		config.plugin('provide').use(webpack.ProvidePlugin, [{
		      $: 'jquery',
		      jquery: 'jquery',
		      jQuery: 'jquery',
		      'window.jQuery': 'jquery'
      }]);
      // 设置图片路径，模板使用‘@’代替‘src’ css中使用‘~@’代替‘src’
      config.resolve.alias.set("@", resolve("src"));
	}
}
