<template>
  <div class='header'>
    <van-nav-bar
      :title='title'
      right-text="···"
      @click-right="onClickRight"
/>
  </div>
</template>

<script>
import { NavBar } from 'vant';
import { Toast } from 'vant';
import {mapState } from 'vuex'

export default {
  components:{
    [NavBar.name]:NavBar
  },
  computed:{
    ...mapState({title:state=>state.indexTitle.title})
  },
  methods: {
    onClickRight() {
      Toast('我是一个没有感情的按钮');
    }
  }
}
</script> 

<style lang='less'>
@import '../../css/index.less';

.header{
  width: 100%;
}
</style>