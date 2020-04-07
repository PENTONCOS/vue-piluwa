import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './css/common.css' // 引入样式重置文件
import  'animate.css/animate.css'
import './assets/rem'
import './css/font/iconfont.css' // 引入字体图标
import './css/index.less';
import './css/style.css'

// 模拟手机调试
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole()
// Vue.use(vConsole)

// 图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
  loading:'timg.jfif',
  preload:'1.3'
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
