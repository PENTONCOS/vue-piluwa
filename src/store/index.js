import  Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import indexTitle from './index_title'
import indexClassify from './index_classify'
import indexLogin from './index_login'
import indexShopping from './index_shopping'
const store = new Vuex.Store({
  modules:{
    // 改变title的模块
    indexTitle,
    // 分类类目模块
    indexClassify,
    // 判断是否登录
    indexLogin,
    // 加入购物车
    indexShopping
  }
})
export default store