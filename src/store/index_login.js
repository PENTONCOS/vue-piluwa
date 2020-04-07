export default {
  namespaced:true,//开启命名空间 会自动在方法前面加模块名
  state:{
    // 判断是否为登录状态
    isLogin:false,
    // 登录成功后的数据
    userInfos:'',
    // 登录成功后产生的token
    userToken:''
  },
  mutations:{
    // 改变登录状态
    changeIsLogin(state,params){
      state.isLogin = params
    },
    // 将登录后数据存储
    storeUserInfos(state,params){
      state.userInfos = params
    },
    // 将登录后数据存储
    storeUserToken(state,params){
      state.userToken = params
    } 
  },
  actions:{
    
  },
  getters:{
  }
}
