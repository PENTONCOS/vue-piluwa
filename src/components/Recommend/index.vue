<template>
  <div class='recommend'>
    <div class='reco_title'>
      <span class='sign'></span>
      推荐商品
    </div>
    <div class='reco_goods' v-for='(item,index) in recommends' :key='index' @click='changeDetailId(item.productId)'>
      <div class='goods_img'>
        <img v-lazy="item.imgUrl" alt="">
      </div>
      <div class="goods_infos">
        <h3>{{item.productName}}</h3>
        <span><em>￥{{item.currentPrice}}</em><s>￥{{item.originalPrice}}</s></span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  props:{
    'recommends':{type:Array,default:[]}
  },
  methods:{
    ...mapMutations(['indexClassify/changeCurrentId']),
    changeDetailId(id){
      this.$router.push('/detail')
      this['indexClassify/changeCurrentId'](id)
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../css/index.less';
.recommend{
  width:100%;
  padding: 0 0.23rem;
  .reco_title{
    width: 100%;
    height: 0.45rem;
    display: flex;
    align-items: center;
    font-size: 0.25rem;
    font-weight: 900;
    .sign{
      display: inline-block;
      width:0.11rem;
      height: 0.37rem;
      background: @font-color;
      margin-right: 0.17rem;
    }
  }
  .reco_goods{
    width:100%;
    height: 2.6rem;
    padding: 0.35rem 0;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    .goods_img{
      width: 2.49rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        height:1.85rem;
      }
    }
    .goods_infos{
      flex:1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span{
        width:100%;
        height: 0.28rem;
      }
      em{
        color:#dc3d45;
        margin-right: 0.11rem;
      }
      s{
        color:#bfbfbf;
        text-decoration: line-through;
      }
    }

    h3{
        font-size: 0.26rem;
        margin: 2px 0 0 4px;
      }
  }
 
}

</style>