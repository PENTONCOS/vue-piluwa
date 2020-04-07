export default {
  namespaced:true,//开启命名空间 会自动在方法前面加模块名
  state:{
    title:'首页',
  },
  mutations:{
    // 改变title的文字
    changeTitle(state, params){
      state.title = params
    },
    // 
    changeShoppingTitle(state,params){
      state.shoppingTitle = params
    }
  },
  actions:{
    changeTitleAction({commit}, hashValue){
      // 判断地址栏的hash值
      switch (hashValue) {
        case 'home':
          commit('changeTitle','首页')
          break;
        case 'classify':
          commit('changeTitle','分类')
          break;
        case 'shoppingcart':
          commit('changeTitle','购物车')
          break;
        case 'my':
          commit('changeTitle','会员中心')
          break;
        default:
          break;
      }
    }
  },
  getters:{
    
  }
}
