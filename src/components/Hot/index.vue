<template>
  <div class="hot">
    <!-- 标题 -->
    <van-nav-bar
      title="热销榜"
      right-text="···"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- tab标签页 -->
    <van-tabs animated>
      <van-tab v-for="(item, index) in classify_list" :key='index' :title="item" >
        <div class="tab-title" slot="title" @click='changeHot(index)'>{{ item }}</div>
        <!-- list列表 -->
        <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh" > -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- tab详情 -->
            <div class="tab-content">
              <div class="hot_goods" v-for='(item, index) in content_list' :key='index'>
                <div class="hot_goods_items" >
                <img :src="item.imgUrl" alt="">
              </div>
              <div class="hot_goods_infos">
                <span>{{item.title}}</span>
                <em>￥350.00 vip</em>
                <i>￥498.00</i>
              </div>
            </div>
          </div>
          </van-list>
        <!-- </van-pull-refresh> -->
      </van-tab>
    </van-tabs> 
  </div>
</template>

<script>
import {getClassifyData} from '../../api/index'
import { NavBar,Toast,Tab, Tabs,List,Cell,PullRefresh } from 'vant';
import {mapState} from 'vuex'
export default {
  name:'Hot',
  components:{
    [NavBar.name]:NavBar,
    [Toast.name]:Toast,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [List.name]:List,
    [Cell.name]:Cell,
    [PullRefresh.name]:PullRefresh
  },
  data(){
    return{
      content_list:[],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      hole_index:0
    }
  },
  computed:{
    ...mapState({
      classify_list:state=>state.indexClassify.classify_list
    })
  },
  methods: {
    changeHot(index){
      // 每次点击改变当前导航项的索引
      // 数据接口不存在index为0的情况 所以1开始
      this.hole_index =index+1
      // 拿到对应项的索引后去请求数据
      getClassifyData(this.hole_index).then((data)=>{
      // 等接口数据补全
      if(data.result.length<=0){
        return '暂无上新'
      }
      this.content_list = data.result
      // console.log(this.content_list)
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      Toast('这是热销榜');
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

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      this.changeHot(--this.hole_index)
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },
  created(){
    // 第一次点击页面和刷新页面 数据为推荐分类
    this.changeHot(0)
  }
}
</script>

<style lang='less' scoped>
@import '../../css/index.less';
.hot{
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #fff;
  left:0px;
  right: 0px;
  z-index: 2;

  .tab-content{
    padding: 0.21rem 0.25rem 2.3rem 0.25rem;
    height:100vh;
    background: #f7f7f7;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
    -webkit-overflow-scrolling: touch; // 为了解决ios上滑动不流畅的问题
    .hot_goods{
      width:3.4rem;
      height: 4.66rem;
      margin-bottom: 0.25rem;
      border-radius: 0.1rem;
      display: flex;
      flex-direction: column;
      background: #fff;
      .hot_goods_items{
        width:100%;
        height: 3.1rem;
        display: flex;
        justify-content: center;
        align-items:center;
        img{
          height:3.1rem;
        }
      }
      .hot_goods_infos{
        flex:1;
        padding: 0.13rem 0.22rem;
        display: flex;
        flex-direction: column;
        span{
          font-size: @fs-18;
        }
        em{
          margin-top: 0.2rem;
          color: #a55862;
        }
        i{
          margin-top:0.1rem;
        }
      }
    }
  }
}
</style>