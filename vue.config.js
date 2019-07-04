/**
 * *@2019-07-03
 * *@author 高阳
 * *@describe vue-cli 3.x配置文件
 */
// const path = require("path");
// const baseUrl = process.env.NODE_ENV === "production" ? "/static/" : "/"; //font scss资源路径 不同环境切换控制

module.exports = {
  //基本路径
  //baseUrl: "./", //vue-cli3.3以下版本使用
  publicPath: "/my-app/", //vue-cli3.3+新版本使用
  //输出文件目录(打包文件目录)
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  //以多页模式构建应用程序。
  pages: {
    index: {
      // page 的入口
      entry: "src/pages/home/views/home.js",
      // 模板来源
      template: "src/pages/home/views/home.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "首页",
      // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: "src/subpage/main.js"
  },
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require("os").cpus().length > 1,
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  // webpack配置
  //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    config.plugins.delete("prefetch");
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
    } else {
      // 为开发环境修改配置...
    }
  },
  //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: config => {
    //生产and测试环境
    let pluginsPro = [];
    //开发环境
    let pluginsDev = [];
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro];
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev];
    }
  },
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        //设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
        data: `
				$baseUrl: "/";
				@import '@/assets/scss/_common.scss';
				`
        //data: `
        //$baseUrl: "/";
        //`
      }
    }
  },
  // 对本地服务器进行相应配置
  // webpack-dev-server 相关配置 https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    // host: "localhost",
    host: "192.168.50.86", //anke本地IP
    port: 8000, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
    hotOnly: true, // 热更新
    proxy: null // 配置跨域处理,只有一个代理
  },

  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions: {
    "style-resources-loader": {
      //https://github.com/yenshih/style-resources-loader
      preProcessor: "scss", //声明类型
      patterns: [
        //path.resolve(__dirname, './src/assets/scss/_common.scss'),
      ]
      //injector: 'append'
    }
  }
};
