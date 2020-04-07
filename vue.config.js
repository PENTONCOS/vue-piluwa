const path = require("path")
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const CompressionPlugin = require('compression-webpack-plugin')
// # 插件引入
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// # 需要压缩的文件类型
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports = {
  lintOnSave: false,//关闭eslint
  publicPath:'./',
  devServer:{
    proxy:{    //配置代理服务器
      // 接口小暗号
      '/piluwavue':{
        target:'http://www.pudge.wang:3001', //要转发的目标网址目标网址 
        changeOrigin:true,
        pathRewrite:{
          "^/piluwavue":''  //将路径中多余的暗号 删除
        }
      }
    }
  },
  // chainwebpack:(config)=>{
  //   config.resolve.alias
  //   .set('@',resolve('./src'))  //src的绝对路径起一个别名叫@
  //   .set('api',resolve('./src/api'))
  //   .set('style',resolve('./src/style'))
  //   .set('components',resolve('./src/components'))
  //   // 配置分析工具
  //   if (process.env.NODE_ENV === 'production'&&process.env.npm_config_report) {
  //     if (process.env.npm_config_report) {
  //       config
  //         .plugin('webpack-bundle-analyzer')
  //         .use(BundleAnalyzerPlugin)
  //         .end();
  //     }
  //   }
  // },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new CompressionPlugin({
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  }
}