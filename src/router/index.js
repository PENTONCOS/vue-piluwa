import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../components/Home'
// import Classify from '../components/Classify'
// import ShoppingCart from '../components/ShoppingCart'
// import My from '../components/My'
// import Hot from '../components/Hot'
// import KindsInfo from '../components/KindsInfo'
// import Detail from '../components/Detail'
// import Register from '../components/Register'
// import Login from '../components/Login'
// import UserInfo from '../components/UserInfo'

// 路由懒加载
const Home =()=>import( '../components/Home')
const Classify =()=>import( '../components/Classify')
const ShoppingCart =()=>import( '../components/ShoppingCart')
const My =()=>import( '../components/My')
const Hot =()=>import( '../components/Hot')
const KindsInfo =()=>import( '../components/KindsInfo')
const Detail =()=>import( '../components/Detail')
const Login =()=>import( '../components/Login')
const UserInfo =()=>import( '../components/UserInfo')


import store from '../store/index_login'

Vue.use(VueRouter)


const routes = [
  {
    path: '/home',
    component: Home,
    children:[
      {
        path:':kindsid', //商品分类
        name:'KindsInfo',
        component: KindsInfo
      }
    ]
  },
  {
    path: '/classify',
    name: 'Classify',
    component: Classify
  },
  {
    path: '/shoppingcart',
    component: ShoppingCart,
    meta:{auth:true}
  },
  {
    path: '/my',
    component: My,
    children:[
      {
        path:'login',
        name:'Login',
        component: Login
      },
      {
        path:'userInfo',
        name:'UserInfo',
        component: UserInfo
      },
    ]
  },
  {
    path:'/hot',
    name:'Hot',
    components:{
      Hot
    }
  },
  {
    path:'/detail',
    name:'Detail',
    components:{
      Detail
    }
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.matched.some( m => m.meta.auth)){
    let isLogin =store.state.isLogin
    if(isLogin){
      next()
    }else{
      next('/my/login')
    }
  }else{
    next()
  }
})



export default router
