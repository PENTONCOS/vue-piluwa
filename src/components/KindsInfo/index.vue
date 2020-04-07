<template>
  <div class='kindsInfo'>
    <!-- 标题 -->
    <van-nav-bar
      :title="name"
      right-text="···"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 内容陈列 -->
    <div class="kindsInfo_content">
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
  </div>
</template>

<script>
import { NavBar,Toast} from 'vant';
import {getClassifyData} from '../../api/index'
export default {
  components:{
    [NavBar.name]:NavBar,
    [Toast.name]:Toast
  },
  data () {
    return{
      name:'暂无数据',
      content_list:[]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      Toast('点啥点！');
    }
  },
  async created(){
    // 通过路由传过来的参数确定需要从接口调什么参数
    let {kindsid} = this.$route.params
    // 判断物品是什么类型名称
    switch (kindsid) {
      case '2':
        this.name = '全球奶粉'
        break;
      case '3':
        this.name = '尿不湿'
        break;
      case '4':
        this.name = '营养辅食'
        break;
      case '5':
        this.name = '宝宝洗护'
        break;
    
      default:
        break;
    }
    let data = await getClassifyData(kindsid)
    this.content_list = data.result
  }
}
</script>

<style lang='less' scoped>
@import '../../css/index.less';

.kindsInfo{
  background: #fff;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left:0px;
  right: 0px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  .kindsInfo_content{
    background: lime;
    flex:1;
    padding: 0.21rem 0.25rem 0 0.25rem;
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