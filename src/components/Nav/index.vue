<template>
  <div class='nav'>
    <router-link to='/home' @click.native='clickChangeTitle("首页")' tag='div' active-class='sel'><span class="iconfont icon-home-cur"></span><span>首页</span></router-link>
    <router-link to='/classify' @click.native='clickChangeTitle("分类")' tag='div' active-class='sel'><span class="iconfont icon-feneli-copy"></span><span>分类</span></router-link>
    <router-link to='/shoppingcart' tag='div' active-class='sel'><span class="iconfont icon-gouwuche"></span><span>购物车</span></router-link>
    <router-link to='/my' @click.native='clickChangeTitle("会员中心")' tag='div' active-class='sel'><span class="iconfont icon-wodedangxuan-copy-copy"></span><span>我的</span></router-link>
  </div>
</template>

<script>
import {mapMutations } from 'vuex'

export default {
  methods:{
    ...mapMutations(['indexTitle/changeTitle']),
    clickChangeTitle(params){
      this['indexTitle/changeTitle'](params)
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../css/index.less';

.nav {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width:100%;
  height: 0.97rem;
  border-top: 1px solid #b8b8b8;
  display: flex;
  background: #fff;
  div {
    width:25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: @fs-20;
    color: @font-color2;
  }
  .iconfont{
    font-size: 0.51rem;
  }
  .icon-feneli-copy {
    font-size: 0.51rem;
  }
  .sel{
  color: @font-color;
}
}


</style>