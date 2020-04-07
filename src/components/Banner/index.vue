<template>
  <div class='banner'>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for='(item,index) in banners' :key='index'>
        <img v-lazy="item" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
export default {
  components:{
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem
  },
  props:{
    'banners':{type:Array,default:[]}
  }
}
</script>

<style lang='less' scoped>
@import '../../css/index.less';
.banner {
  width: 100%;
  height: 4.13rem;
  img{
    height: 4.13rem;
  }
}
</style>