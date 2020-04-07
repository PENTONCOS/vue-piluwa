<template>
  <div class='classify'>
    <div class="classify_content">
      <van-search class='classify_input' v-model="value" shape='round' placeholder="新春大促销" />
      <div class="sider_nav">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item :title='item' v-for='(item,index) in classify_list' :key='index' @click="changeClassify(index)"/>
        </van-sidebar>
        <div class="classify_goods">
          <div class="classify_goods_items" v-for="(item,index) in content_list" :key='index' @click='changeDetailId(item.productId)'>
            <img :src="item.imgUrl" alt="">
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getClassifyData} from '../../api/index'
import { Search } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import{mapState,mapMutations,mapActions} from 'vuex'
export default {
  name:'Classify',
  components:{
    [Search.name]:Search,
    [Sidebar.name]:Sidebar,
    [SidebarItem.name]:SidebarItem
  },
  data(){
    return{
      value:'',
      activeKey: 0,
      content_list:[],
    }
  },
  computed:{
    ...mapState({
      classify_list:state=>state.indexClassify.classify_list
    })
  },
  methods:{
    ...mapActions(['indexTitle/changeTitleAction']),
    ...mapMutations(['indexClassify/changeCurrentId']),
    changeDetailId(id){
      this.$router.push('/detail')
      this['indexClassify/changeCurrentId'](id)
    },
    // 取到hash值对比看header上显示什么
    getHashValue(){
      let hashValue=location.hash.substring(2)
      this['indexTitle/changeTitleAction'](hashValue)
    },
    changeClassify(index){
      // 每次点击改变当前导航项的索引
      this.activeKey=index;
      // 数据接口不存在index为0的情况 所以1开始
      index+=1
      // 拿到对应项的索引后去请求数据
      getClassifyData(index).then((data)=>{
      // 等接口数据补全
      if(data.result.length<=0){
        return '暂无上新'
      }
      this.content_list = data.result
      })
    }
  },
  created(){
    // 每次刷新页面都判断title是什么
    this.getHashValue()
    // 每次刷新页面都优先显示推荐分类
    this.changeClassify(0);
  }
}
</script>

<style lang='less' scoped >
@import '../../css/index.less';
.classify_content{
  display:flex;
  flex-direction: column;
  .sider_nav{
    display: flex;
    .classify_goods {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .classify_goods_items{
      width:33.333%;
      height: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width:1.4rem;
      }
      span{
        width:1.46rem;
        height: 0.36rem;
        font-size:0.24rem;
        text-align: center;
        margin-top: 0.20rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        word-break:keep-all;
        font-weight: 600;
      }
    }
  }
}

</style>

<style lang="less">
.van-search{
  width:100%;
  top:0.01rem;
  z-index:2;
  background:rgba(255,255,255,0);
}
</style>