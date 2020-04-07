<template>
  <div class='shoppingcart' >
    <!-- 有货的时候 -->
    <!-- <div class="hasGoods" v-if='goodsArray.length'> -->
    <div class="hasGoods" v-if='cartArry.length'>
      <div class="edit_goods">
        <span>编辑</span>
      </div>
      <!-- 商品详情 -->
      <van-checkbox-group v-model="result" ref="checkboxGroup" @change='changeAllSelect'>
      <div class="cart_goods">
        <div class="cart_goods_item" v-for="(item,index) in cartArry" :key='index'>
          <!-- 单选框 -->
          <van-checkbox :name='index' ref='checkbox' checked-color="#eb8942"></van-checkbox>
          <!-- 商品图片 -->
          <div class="goods_img">
            <img :src="item.productImg" alt="">
          </div>
          <!-- 商品详情 -->
          <div class="goods_infos">
            <div class="goods_infos_title">
              <div>{{item.productName}}</div>
              <span>{{item.standard}}</span>
            </div>
            <div class="goods_infos_price">
              <span><sub>￥</sub>{{item.productPrice}}.00</span>
              <!-- 步进器 -->
              <van-stepper v-model="item.count" ref='stepper' disabled-input @change='changeNumber(index)'/>
            </div>
          </div>
        </div>
      </div>
      </van-checkbox-group>
    </div>
    <!-- 无货的时候 -->
    <div class="hasNoGoods" v-else>
      <div class="edit_goods">
        <span>编辑</span>
      </div>
      <div class="shopping_goods">
        <span class="iconfont icon-gouwuche"></span>
        <span>您的购物车是空的</span>
      </div>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar
      :price="sumPrice"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="AllChecked" ref='AllChecked' checked-color="#eb8942"  @click="toggleAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import {mapState,mapActions, mapMutations} from 'vuex'
import { SubmitBar,Checkbox,SwipeCell,Card,Button,Stepper,CheckboxGroup } from 'vant';
import {getCartData} from '../../api/index'

export default {
  components:{
    [SubmitBar.name]:SubmitBar,
    [Checkbox.name]:Checkbox,
    [SwipeCell.name]:SwipeCell,
    [Card.name]:Card,
    [Button.name]:Button,
    [Stepper.name]:Stepper,
    [CheckboxGroup.name]:CheckboxGroup
  },
  computed:{
    ...mapState({
      goodsArray:state=>state.indexShopping.goodsArray,
      userToken:state=>state.indexLogin.userToken
    })
  },
  data(){
    return {
      AllChecked:false, // 全选的状态
      cartArry:[], // 从接口上取下的货物数据
      result:[],
      sumPrice:0, // 合计
      currentTitle:'gouwuche'
    }
  },
  methods:{
    ...mapActions(['indexTitle/changeTitleAction']),
    ...mapMutations(['indexTitle/changeTitle']),
    // 计算总价
    calSumPrice(){
      this.sumPrice = 0;
      // console.log(this.$refs.stepper.value)
      this.$refs.checkbox.map((element,index)=>{
          if(element.checked){
            this.sumPrice+=this.cartArry[index].productPrice*this.cartArry[index].count*100
          }
        })
    },
    // 步进器的绑定值发生改变的时候触发
    changeNumber(index){
      this.$nextTick(()=>{
        this.calSumPrice() //求和
      })
    },
    // 判断当子绑定的单选状态 来确定全选的状态
    changeAllSelect(){
      let checkNumber = 0
      this.$refs.checkbox.map((element)=>{
        // console.log(element.checked)
        if(element.checked){
          checkNumber++
        }
      })
      if(checkNumber===this.$refs.checkbox.length){
        this.$refs.AllChecked.checked=true
      }else{
        this.$refs.AllChecked.checked=false
      }
      this.calSumPrice();//求和
    },
    // 全选/反选
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
      this.calSumPrice();//求和
    },
    // 结算事件
    onSubmit(){
      // console.log('可以算账了')
    },
    // 取到hash值对比看header上显示什么
    getHashValue(){
      let hashValue=location.hash.substring(2)
      this['indexTitle/changeTitleAction'](hashValue)
    }
  },
  created(){
    // 先获取购物车的数据
    getCartData(this.userToken).then((data)=>{
      // console.log(data.result.resArr)
      this.cartArry=data.result.resArr
       // 每次刷新页面都判断title是什么
      // console.log(this.cartArry.length)
      if(!this.cartArry.length){ // 购物车内没有商品时
        this.getHashValue()
      }else{  // 购物车内有商品时
        this['indexTitle/changeTitle'](`购物车(${this.cartArry.length})`)
      }
    })
  }
}
</script>

<style lang='less' >
@import '../../css/index.less';
.shoppingcart{
  width:100%;
  height: 100%;
  background: #fff;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  .hasGoods{
    background: #f7f7f7;
    width:100%;
    height:100%;
    .cart_goods{
      width:100%;
      background: #fff;
      overflow:auto;
      -webkit-overflow-scrolling: touch; // 为了解决ios上滑动不流畅的问题
      padding: 0 0 3rem 0;
      .cart_goods_item{
        padding: 0.31rem 0.25rem 0.27rem 0.21rem;
        width:100%;
        height: 2.42rem;
        display:flex;
        background: #fff;
        .van-checkbox{
          width: 0.45rem;
          height:100%;
        }
        .goods_img{
          width:1.85rem;
          height:100%;
          img{
            width:1.85rem;
            height:1.85rem;
          }
        }
        .goods_infos{
          flex:1;
          display:flex;
          flex-direction: column;
          .goods_infos_title{
            width:100%;
            height:1.23rem;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            div{
              font-size: 0.24rem;
              color:#303030;
              font-weight:bolder;
            }
            span{
              font-size: 0.21rem;
              color:#7b7b7b;
            }
          }
          .goods_infos_price{
            flex:1;
            display:flex;
            justify-content:space-between;
            align-items: center;
            span{
              font-size: 0.24rem;
              color:#e9314b;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
  .edit_goods{
    width:100%;
    height:0.9rem;
    display: flex;
    justify-content: flex-end;
    align-items:center;
    span{
      color: #eb8942;
      font-size: 0.26rem;
      margin-right: 0.3rem;
    }
  }
  .shopping_goods{
    width:100%;
    height:6rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
      font-size: 0.35rem;
      color:#dedede;
    }
    .iconfont{
      font-size:2rem;
      margin-bottom:0.5rem;
    }
  }
  .van-submit-bar{
    width:100%;
    height:0.93rem;
    position: fixed;
    bottom:0.95rem;
    border-top:1px solid #dedede;
    .van-submit-bar__bar{
      padding: 0 0 0 0.16rem;
      .van-button--normal{
        height:100%;
        padding:0;
        border-radius:0;
        background: #eb8942;
        font-size: 0.33rem;
      }
    }
  } 
}
</style>