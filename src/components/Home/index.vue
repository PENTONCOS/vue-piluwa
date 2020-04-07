<template>
  <div class='home'>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" 
          success-text="哎呀，发现我了">
      <van-search
        v-model="value"
        placeholder="新春大促销"
        shape='round'
      />
      <Banner :banners='list_banner'></Banner>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <div class="dailyItem">
          <span class='section'><span class="iconfont icon-rili"></span>每日福利</span>
          <span class='section' @click="goHot"><span class="iconfont icon-hot"></span>热销榜</span>
          <span class='section'><span class="iconfont icon-jingxuan"></span>皮噜甄选</span>
          <span class='section'><span class="iconfont icon-card"></span>会员中心</span>
        </div>
        <div class="somekind">
          <div class="s_item" @click="goKindsInfo(2)">
            <span>全球奶粉</span>
            <img src="../../../public/1.png" alt="">
          </div>
          <div class="s_item" @click="goKindsInfo(3)">
            <span>尿不湿</span>
            <img src="../../../public/2.png" alt="">
          </div>
          <div class="s_item" @click="goKindsInfo(4)">
            <span>营养辅食</span>
            <img src="../../../public/3.png" alt="">
          </div>
          <div class="s_item" @click="goKindsInfo(5)">
            <span>宝宝洗护</span>
            <img src="../../../public/4.png" alt="">
          </div>
        </div>
        <Recommend :recommends='list_recommend'></Recommend>
      </van-list>
    </van-pull-refresh>
    <!--嵌套路由 -->
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
import Banner from '../Banner'
import Recommend from '../Recommend'
import {getBannerData, getRecommendData} from '../../api/index.js'
import { List,Cell,PullRefresh ,Search} from 'vant';

export default {
  name:'Home',
  components:{
    Banner,
    Recommend,
    [List.name]:List,
    [Cell.name]:Cell,
    [PullRefresh.name]:PullRefresh,
    [Search.name]:Search
  },
  data(){
    return {
      list_banner:[],
      list_recommend:[],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      value:''
    }
  },
  methods:{
    goKindsInfo(type){
      this.$router.push(`/home/${type}`)
    },
    goHot() {
      this.$router.push('/hot')
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list_recommend.length >= 9) {
          this.finished = true;
          this.loading = false;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载推荐商品的数据
      getRecommendData().then((data)=>{
      this.list_recommend=data.result.list
      })
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },
  mounted(){
    getBannerData().then((data)=>{
     this.list_banner=data.result.list
    }),
    getRecommendData().then((data)=>{
      this.list_recommend=data.result.list
    })
  }
}
</script>

<style lang='less' scoped>
@import '../../css/index.less';
.home{
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .van-search{
    position: absolute;
    width:100%;
    top:0.01rem;
    z-index:2;
    background:rgba(255,255,255,0);
}
  .dailyItem{
    width:100%;
    height: 2.42rem;
    padding: 0 0.23rem;
    display: flex;
    .section{
      width: 25%;
      height:100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size:@fs-22;
    }
    .iconfont{
      font-size:0.5rem;
      margin-bottom: 0.34rem;
    }
    .icon-rili{
      color: @font-color;
    }
    .icon-hot{
      color: #f37575;
    }
    .icon-jingxuan{
      color: #f0bc3d;
    }
    .icon-card{
      color: #957ae5;
    }
  }
  .somekind{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.23rem;
    justify-content: space-between;
    .s_item{
      width:3.47rem;
      height: 2.07rem;
      margin-bottom: 0.22rem;
      padding: 0.31rem 0.2rem 0 0.32rem;
      display: flex;
      justify-content: space-between;

      &:nth-child(1){
        background: #fff6e5;
      }
      &:nth-child(2){
        background: #fcfef0;
      }
      &:nth-child(3){
        background: #fff3f5;
      }
      &:nth-child(4){
        background: #f6f7fc;
      }
      span{
        font-size:@fs-26;
        font-weight: 600;
      }
      img{
        width:1.66rem;
        height:1.64rem;
      }
    }

  }
}
</style>