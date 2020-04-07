export default {
  namespaced:true,//开启命名空间 会自动在方法前面加模块名
  state:{
    // 购买的物品
    goodsArray:[] //长度为0时 显示购物车为0的页面 有长度就是购物车不为0的页面
  },
  mutations:{
    // 往物品数组里push购买的对象
    getGoodsId(state,obj){
      // 判断物品是否是添加过的
      if(state.goodsArray.length<1){
        // console.log('这是第一次')
        state.goodsArray.push(obj)
      }else{
        let tag = 1;
        for(let index = 0; index < state.goodsArray.length; index++) { // 有时间用map替换for
          // console.log('进入循环')
          if(state.goodsArray[index].productId==obj.productId
            ){
            // console.log(1).
            tag=2
            state.goodsArray[index].number += obj.number
            return
          }
        }
        if(tag==1){
          // console.log(2)
          state.goodsArray.push(obj)
          return
        }
      }
      
      // state.goodsArray.forEach(element => {
      //   console.log(0)
      //   if(element.productId==obj.productId){
      //     console.log(1)
      //     element.number+=obj.bumber
      //   }else{
      //     console.log(2)

      //     state.goodsArray.push(obj)
      //   }
      // });
    }
  },
  actions:{
    
  },
  getters:{
    
  }
}
