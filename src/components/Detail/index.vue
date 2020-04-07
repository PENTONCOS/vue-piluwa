<template>
  <!-- 当当前id存在时显示 -->
  <div class='detail' v-if='detail_data'> 
    <!-- 标题 -->
    <van-nav-bar
      title="商品详情"
      right-text="···"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 轮播图 -->
    <van-swipe @change="onChange">
      <van-swipe-item v-for="(item,index) in detail_data.imgArr" :key='index'>
        <img :src="item" alt="">
      </van-swipe-item>

      <div class="custom-indicator" slot="indicator">
        {{ current + 1 }}/{{detail_data.imgArr.length}}
      </div>
    </van-swipe>
    <!-- 商品详情 -->
    <div class="detail_infos">
      <div class='detail_infos_vip'>
        
        <span><small>￥</small>{{detail_data.currentPrice+'.00'}}</span>
        <div slot="tags">
          <van-tag round color="#fbe6d5">会员专享</van-tag>
        </div></div>
      <div class='detail_infos_normal'><span>普通价￥{{detail_data.originalPrice}}.00</span><span class='detail_title'>{{detail_data.productName}}</span></div>
      <p class="detail_infos_describe">{{detail_data.describe}}</P>
    </div>
    <!-- 可选规格 -->
    <div class="detail_choose" @click="onClickButton">
      <span>选择</span>
      <span>可选规则</span>
    </div>
    <!-- 商品评论 -->
    <div class="detail_choose">
      <span>商品评论</span>
      <span>(0)</span>
    </div>
    
    <!-- 弹出框 -->
    <van-popup
      v-model="popupShow"
      round
      position="bottom"
      :closeable='closeButton'
      :style="{ height: '70%' }"
    >
      <div class="popup_goods">
        <div class="popup_goods_img">
          <img :src="detail_data.imgUrl" alt="">
        </div>
        <div class="popup_goods_infos">
          <div class='popup_infos_vip'>
        
            <span><small>￥</small>{{detail_data.currentPrice+'.00'}}</span>
            <div slot="tags">
              <van-tag round color="#fbe6d5"> 会员专享</van-tag>
            </div>
          </div>
          <div class='popup_infos_normal'>
            <span>普通价￥{{detail_data.originalPrice}}.00</span>
          </div>
        </div>
      </div>
      <div class="popup_standards">
        <div class='item'>{{detail_data.standards.title}}</div>
        <div class="item2"><span v-for='(item, index) in detail_data.standards.standards' :key='index'>{{item}}</span></div>
      </div>
      <div class="popup_number">
        <div class='item'>购买数量</div>
        <div class="item2">
          <van-stepper v-model="number" integer />
        </div>
      </div>
      <van-button color='#eb8942' type="primary" size="large" @click='makeSureGoods'>确&nbsp;定</van-button>
    </van-popup>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
    </van-goods-action>
  </div>
  
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import { NavBar,Toast,Swipe, SwipeItem,Tag,Sku,GoodsAction, GoodsActionIcon, GoodsActionButton,Popup,Button,Stepper} from 'vant';
import {getDetailData,addCart} from '../../api/index'

export default {
  components:{
    [NavBar.name]:NavBar,
    [Toast.name]:Toast,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [Tag.name]:Tag,
    [Sku.name]:Sku,
    [GoodsAction.name]:GoodsAction,
    [GoodsActionIcon.name]:GoodsActionIcon,
    [GoodsActionButton.name]:GoodsActionButton,
    [Popup.name]:Popup,
    [Button.name]:Button,
    [Stepper.name]:Stepper
  },
  data(){
    return {
      current: 0,
      detail_data:'',
      popupShow:false,
      closeButton:true,
      number:1
    }
  },
  computed:{
    ...mapState({
      currentId: state=>state.indexClassify.currentId,
      goodsArray:state=>state.indexShopping.goodsArray,
      userToken:state=>state.indexLogin.userToken
    })
  },
  methods:{
    ...mapMutations(['indexShopping/getGoodsId']),
    // 点击确定按钮 提交数目和商品id 并且关闭弹出层
    makeSureGoods(){
      // 关闭弹出层
      this.popupShow=false;
      let {productId} = this.detail_data
      let number = this.number
      let standard = this.detail_data.title
      this['indexShopping/getGoodsId']({productId,number,standard})
      // console.log('--------',this.goodsArray)
      // 关闭弹出层同时，将数据上传到后端
      if(this.userToken){
      let token = this.userToken

      this.goodsArray.forEach(element => {
        let productId = element.productId
        let count = element.number
        let standard= element.standard
        addCart({token,productId,count,standard}).then((data)=>{
          // console.log(data)
        })
      });
    }
    },
    onChange(index) {
      this.current = index;
    },
    onClickIcon() {
      Toast('点击图标');
    },
    onClickButton() {
      // 打开弹出层
      this.popupShow=true;

    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      Toast('这是物品详情页');
    }
  },
  mounted(){
    // console.log('详情页生成')
    // 请求数据
    if(this.currentId){
      getDetailData(this.currentId).then((data)=>{
        this.$nextTick(()=>{
          this.detail_data = data.result;
        })
      })
    }
  },
  // 关闭详情页的时候 把所有的数据上传到后端接口
  beforeRouteLeave (to, from, next) {
    // console.log('离开详情页')
    
    next()
  }
}
</script>

<style lang='less' scoped>
@import '../../css/index.less';
.detail{
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #f7f7f7;
  left:0px;
  right: 0px;
  z-index: 2;
  padding:0 0 2.65rem 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .van-swipe{
    position: relative;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      height:5.84rem;
      line-height: 5.94rem;
      text-align: center;
      background-color: #fff;
      display: flex;
      justify-content: center;
      img{
        width: 5rem;
        height: 4.24rem;
      }
    }
    .custom-indicator{
      position: absolute;
      right: 0.32rem;
      bottom: 0.53rem;
      color: #fff;
      background: #b9b9b9;
      width: 0.86rem;
      height:0.38rem;
      border-radius: 0.19rem;
      text-align: center;
      line-height: 0.38rem;
    }
  }
  .detail_infos{
    width: 100%;
    height: 3.09rem;
    padding: 0.42rem 0 0 0.28rem;
    display: flex;
    flex-direction: column;
    background: #fff;
    .detail_infos_vip{
      display: flex;
      width: 100%;
      height:0.71rem;
      font-size: 0.24rem;
      color: #be541c;
      span {
        font-size: 0.4rem;
        height:0.4rem;
        line-height:0.4rem;
        small{
          font-size: 0.3rem;
        }
      }
      .van-tag{
        color: #c14b24;
        font-size: @fs-18;
        padding:0.1rem 0.13rem;
        margin-top: 0.1rem;
        margin-left: 0.22rem;
        text-align: center;
      }
    }
    .detail_infos_normal{
      width: 100%;
      height: 1.17rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 0.26rem;
      color: #7c7c7c;
      .detail_title{
        font-size:0.26rem;
        font-weight:600;
        color:#000;
        margin-bottom: 0.2rem;
        margin-left:0px;
      }
    }
    .detail_infos_describe{
      flex:1;
      font-size: 0.22rem;
      color:#919191;
      line-height:0.3rem;
    }
  }
  .detail_choose{
    width:100%;
    height: 0.9rem;
    margin-top: 0.3rem;
    background: #fff;
    display: flex;
    align-items: center;
    span{
      margin-right:0.46rem;
      font-size: 0.22rem;
      color:#000;
      font-weight:600;
      padding: 0 0 0 0.28rem;
    }
  }

  .van-popup{
    padding: 0.38rem 0.29rem 0 0.29rem;
    .popup_goods{
      width:100%;
      height: 2.3rem;
      border-bottom: 2px solid #e0e0e0;
      display:flex;
      .popup_goods_img{
        width:2.08rem;
        height:2.28rem;
        img{
          width:2.08rem;
        }
      }
      .popup_goods_infos{
        flex:1;
        padding:0 0 0 0.38rem;
        display:flex;
        flex-direction: column;
        justify-content: center;
        .popup_infos_vip{
          display: flex;
          width: 100%;
          height:0.71rem;
          font-size: 0.24rem;
          color: #be541c;
          span {
            font-size: 0.4rem;
            height:0.4rem;
            line-height:0.4rem;
          small{
            font-size: 0.3rem;
          }
        }
        .van-tag{
          color: #c14b24;
          font-size: @fs-18;
          padding:0.1rem 0.13rem;
          margin-top: 0.1rem;
          margin-left: 0.22rem;
          text-align: center;
      }
    }
      .popup_infos_normal{
        width: 100%;
        height: 0.36rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 0.26rem;
        color: #7c7c7c;
        }
      }
      
    }
    .popup_standards{
        width:100%;
        height: 1.9rem;
        border-bottom: 2px solid #e0e0e0;
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        .item{
          height: 0.84rem;
          color: #1a1a1a;
          font-size: 0.27rem;
          line-height:0.84rem;
          font-weight:600;
        }
        .item2{
          flex:1;
          display: flex;
          align-items: center;
          span{
            padding: 0.16rem 0.3rem;
            border:1px solid #9e9e9e;
            border-radius: 0.29rem;
            margin-right:0.82rem;
            color: #9e9e9e;
            text-align: center;
            font-size: 0.25rem;
            margin-bottom: 0.25rem;
          
          }
        }
      }
      .popup_number{
        width:100%;
        border-bottom: 2px solid #e0e0e0;
        display:flex;
        justify-content: space-between;
        .item{
          height: 0.84rem;
          color: #1a1a1a;
          font-size: 0.27rem;
          line-height:0.84rem;
          font-weight:600;
        }
        .item2{
          height: 0.84rem;
          color: #1a1a1a;
          font-size: 0.27rem;
          font-weight:600;
          display:flex;
          align-items: center;
          span{
            width:0.61rem;
            height:0.44rem;
            background: #f4f4f4;
            border-left:0.03rem;
            line-height:0.44rem;
            text-align: center;
          }
        }

      }
       .van-button {
          position:fixed;
          bottom: 0;
          left:0;
          font-size: 0.33rem;
          height:1rem;
        }
  }
 
  
}
</style>