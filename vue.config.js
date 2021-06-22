/* eslint-disable */

let ENV = process.env.VUE_APP_ENV
let PUBLICPATH = process.env.VUE_APP_PUBLICPATH
// console.log(ENV)

module.exports = {
  // 配置生成dist里面static的cdn资源路径（测试环境为/，正式环境走cdn路径）
  publicPath: PUBLICPATH,
  lintOnSave: ENV === 'local' ? true : false, // 开发环境开启eslint，测试和线上编译代码禁止eslint

  //  webpack 配置，键值对象时会合并配置，为方法时会改写配置
  configureWebpack: (config) => {
    // 扩展资源，不将部分资源js等打入包内引用cdn资源
    config.externals = {
      // 'swiper': 'Swiper',
    }

    if (ENV === 'local') {
      return {
        devServer: {
          host: 'localhost',
          port: 8080,
          open: true, // 构建完成自动打开浏览器
          // https: true,
          disableHostCheck: true

          // eslint检测影响代码编译，注释调不会影响代码编译
          // overlay: {
          //   warnings: true,
          //   errors: true
          // }
        }
      }
    } else {
      //警告 webpack 的性能提示
      config.performance = {
        hints: 'warning', // 显示警告
        // 入口起点的最大体积
        maxEntrypointSize: 512000, // 500kib
        // 生成文件的最大体积
        maxAssetSize: 307200, // 300kib
        // 只给出 js 文件的性能提示
        assetFilter(assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }
    }
  },

  // 允许对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: (config) => {
    // 取消 chunks，每个页面只对应一个单独的 JS / CSS
    config.optimization.splitChunks({
      cacheGroups: {}
    })

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) =>
        Object.assign(options, {
          limit: 10240, // 小于10k，压缩图片 => base64
          // limit: 3000,
          publicPath: PUBLICPATH,
          name: `[name].[hash:8].[ext]`
        })
      )

    // 设置fonts字体文件引用的路径
    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
      .loader('file-loader')
      .tap((options) =>
        Object.assign(options, {
          limit: 5000,
          publicPath: PUBLICPATH,
          name: '[name].[hash:8].[ext]'
        })
      )

    // underscoreTemplate模版引擎
    config.module
      .rule('tpl')
      .test(/\.tpl$/i)
      .use('underscore-template-loader')
      .loader('underscore-template-loader')

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')

    // npm run report；打印app.js的模块报告，查看各个模块；
    if (process.env.VUE_APP_REPORT === 'report') {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },

  // css配置处理
  css: {
    // 是否使用css分离插件 ExtractTextPlugin；true：页面css独立分割，false：页面css统一打包；
    extract: ENV === 'local' ? false : true,
    // 开启 CSS source maps（默认false）线上关闭，测试和本地开启
    sourceMap: ENV === 'local' || ENV === 'testing' ? true : false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        // sass的公共方法和变量，需要预编译；
        // prependData: `
        //         @import "@/assets/css/global.scss";
        //         @import "@/assets/css/func.scss";
        //     `,
      },
      postcss: {
        plugins: [
          // 浏览器自动加前缀
          require('autoprefixer')({
            overrideBrowserslist: ['Android 4.0', 'iOS 7', 'Chrome > 31', 'ff > 31', 'ie >= 8']
          })
        ]
      }
    },
    /** 启用 CSS modules for all css / pre-processor files.
     引入第三方ui库和如果在js中引用了css的话，必须设置为true，因为如果设置为false的话，会把这些通过js引入的css启动css modules，
     会将第三方ui的css类名后面加上哈希值，会出问题。
     参考文档(vue-cli官网解释)：https://cli.vuejs.org/zh/config/#css-requiremoduleextension 和
     https://cli.vuejs.org/zh/guide/css.html#css-modules
     **/
    requireModuleExtension: true
  },

  // 第三方插件配置
  pluginOptions: {
    // ...
  },

  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1
}
