export default {
  namespaced:true,//开启命名空间 会自动在方法前面加模块名
  state:{
    classify_list:["推荐分类","全球奶粉","尿不湿","营养辅食","喂养用品","宝宝洗护","清洁用品"],
    currentId:0 //当前点击商品的id
  },
  mutations:{
    // 改变当前点击的商品
    changeCurrentId(state,id){
      state.currentId=id
    }
  },
  actions:{
    
  },
  getters:{
    
  }
}
