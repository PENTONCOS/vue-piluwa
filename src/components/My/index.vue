<template>
  <div class='my'>
    <!-- 登录后的个人页面 -->
    <div class="isLogin" v-if='isLogin'>
      <!-- 个人信息 -->
      <div class="my_infos">
        <div class="my_infos_profile" @click="changeInfos">
          <van-image
            round
            width="1.2rem"
            height="1.2rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span @click="changeInfos">{{nickName}}</span>
          <section>{{sex}}</section>
        </div>
        <div class="vip_card"></div>
      </div>
      <!-- 我的订单 -->
      <div class="my_order">
        <div class="section">
          <div class="item">
            <span>我的订单</span>
          </div>
          <div class="item2">
            <div class="btm">
              <span class="iconfont icon-daifukuan"></span>
              <span>待付款</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-fahuo"></span>
              <span>待发货</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-daishouhuo"></span>
              <span>待收货</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-yishouhuo"></span>
              <span>已收货</span>
            </div>
          </div>
        </div>
      </div>
      <!--更多关于订单 -->
      <div class="my_order ">
        <div class="section more_order">
          <div class="item2">
            <div class="btm">
              <span class="iconfont icon-wodebiaodan-xian"></span>
              <span>我的表单</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-icon-vip"></span>
              <span>我的会员卡</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-wodejifen"></span>
              <span>我的积分</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-wodeyouhuiquan"></span>
              <span>我的优惠券</span>
            </div>
          </div>
          <div class="item2">
            <div class="btm">
              <span class="iconfont icon-wodeyue"></span>
              <span>我的余额</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-wodekanjia"></span>
              <span>我的砍价</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-tuiguangyuan"></span>
              <span>推广员中心</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-shouhuoren"></span>
              <span>收货人信息</span>
            </div>
          </div>
          <div class="item2">
            <div class="btm"  @click="exitLogin">
              <span class="iconfont icon-Group"></span>
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 未登录的个人页面 -->
    <div class="unLogin" v-else>
      <!-- 个人信息 -->
      <div class="my_infos">
        <div class="my_infos_profile" @click='onLogin'>
          <van-image
            round
            width="1.2rem"
            height="1.2rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span @click='onLogin'>立即登录</span>
        </div>
      </div>
      <!-- 我的订单 -->
      <div class="my_order">
        <div class="section">
          <div class="item">
            <span>我的订单</span>
          </div>
          <div class="item2">
            <div class="btm">
              <span class="iconfont icon-daifukuan"></span>
              <span>待付款</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-fahuo"></span>
              <span>待发货</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-daishouhuo"></span>
              <span>待收货</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-yishouhuo"></span>
              <span>已收货</span>
            </div>
          </div>
        </div>
      </div>
      <!--更多关于订单 -->
      <div class="my_order ">
        <div class="section more_order">
          <div class="item2">
            <div class="btm">
              <span class="iconfont icon-wodebiaodan-xian"></span>
              <span>我的表单</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-icon-vip"></span>
              <span>我的会员卡</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-wodejifen"></span>
              <span>我的积分</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-wodeyouhuiquan"></span>
              <span>我的优惠券</span>
            </div>
          </div>
          <div class="item2">
            <div class="btm">
              <span class="iconfont icon-wodeyue"></span>
              <span>我的余额</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-wodekanjia"></span>
              <span>我的砍价</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-tuiguangyuan"></span>
              <span>推广员中心</span>
            </div>
            <div class="btm">
              <span class="iconfont icon-shouhuoren"></span>
              <span>收货人信息</span>
            </div>
          </div>
          <div class="item2">
            <div class="btm">
              <span class="iconfont icon-Group"></span>
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录 嵌套路由 -->
    <!-- 需要动效的路由 -->
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import { Image } from 'vant';
import {getUserInfosData} from '../../api/index'
export default {
  components:{
    [Image.name]:Image
  },
  data(){
    return{
      sex:'',
      nickName:''
    }
  },
  computed:{
    ...mapState({
      isLogin:state=>state.indexLogin.isLogin,
      userInfos:state=>state.indexLogin.userInfos,
      userToken:state=>state.indexLogin.userToken
    })
  },
  methods:{
    ...mapActions(['indexTitle/changeTitleAction']),
    ...mapMutations(['indexLogin/changeIsLogin']),
    // 退出登录
    exitLogin(){
      this.$router.push('/my/login')
      // 把登录状态改为未登录
      this['indexLogin/changeIsLogin'](false)
    },
    // 登录成功后 点击头像或者名字进入个人详情页面
    changeInfos(){
      // console.log(1)
      this.$router.push('/my/userInfo')
    },
    // 取到hash值对比看header上显示什么
    getHashValue(){
      let hashValue=location.hash.substring(2)
      this['indexTitle/changeTitleAction'](hashValue)
    },
    // 点击立即登录显示登录界面
    onLogin(){
      // console.log('要去登录页面')
      this.$router.push('/my/login')
    }
  },
  created(){
    
    // 每次刷新页面都判断title是什么
    this.getHashValue()
    // 获取个人信息 设置性别
    if(this.isLogin){
      getUserInfosData(this.userToken).then((data)=>{
        // console.log('会员中心',data)
        if(data.result.sex==1){
          this.sex='GG ♂'
        }else if(data.result.sex==2){
          this.sex='MM ♀'
        }
        this.nickName = data.result.nickName
      })
    }
  },
  watch:{
    
  },
  mounted(){
  }
}
</script>

<style lang='less' >
@import '../../css/index.less';
.my{
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  height:100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch; // 为了解决ios上滑动不流畅的问题

  .my_infos{
    width: 100%;
    height: 2.62rem;
    background: linear-gradient(to right, #f4b572 , #ee7562);;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .my_infos_profile{
      padding: 0 0 0 0.39rem;
      width: 100%;
      height: 1.26rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        margin-left: 0.23rem;
        color:#fff;
        font-size: 0.24rem;
      }
      section{
        margin-left:0.23rem;
      }
    }
  }
  .my_order{
    padding: 0.21rem 0.18rem 0 0.18rem;
    display: flex;
    .section{
      width:100%;
      height: 2.17rem;
      background: #fff;
      display: flex;
      flex-direction: column;
      border-radius: 0.2rem;
      .item{
        width:100%;
        flex:1;
        border-bottom:1px solid #f4f4f4;
        span{
          font-size: 0.28rem;
          font-weight: 600;
          color:#272727;
          height: 100%;
          display: flex;
          align-items: center;
          margin-left: 0.33rem;
        }
      }
      .item2{
        height:1.48rem;
        display:flex;
        width:100%;
        justify-content: flex-start;
        .btm{
          width:25%;
          height:100%;
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span{
            font-size: 0.2rem;
          }
          .iconfont {
            font-size: 0.36rem;
            margin-bottom: 0.16rem;
          }
        }
      }
    }
    .more_order{
    height:100%;
    }
  }
  
}
</style>