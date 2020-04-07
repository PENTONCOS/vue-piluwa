<template>
  <div id="app">
    <Header></Header>
    <!--嵌套路由 -->
    <keep-alive include='Home,Classify'>
      <router-view></router-view>
    </keep-alive>
    <!-- 需要动效的路由 -->
    <!-- hot榜 -->
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >
    <keep-alive key='hotKeepLive'>
      <router-view name='Hot' key='hotView'></router-view>
    </keep-alive>
    </transition>
    <!-- 商品详情 -->
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >
    <router-view name='Detail' key='DetailView'></router-view>
    </transition>
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from './components/Nav'
import Header from './components/Header'
export default {
  components:{ Nav, Header}
}
</script>

<style lang="less" scoped>
@import './css/index.less';
#app {
  width: 100%;
  height: 100vh;
  background: #ffffff;
}

</style>
