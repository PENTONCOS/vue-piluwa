// 封装网路请求
import axios from '../components/utils/axios'
/******************* 首页 *************************/
// 轮播图
let getBannerData = () =>{
  let url = '/piluwavue/home/banner';
  return axios.get(url)
}
// 推荐商品
let getRecommendData = () =>{
  let url = '/piluwavue/home/recommend';
  return axios.post(url)
}
/******************* 分类 *************************/
// 请求侧边导航对应的数据
let getClassifyData = (index) =>{
    let url = '/piluwavue/classify';
    return axios.post(url,{type:index})
}
/******************* 详情页数据 *************************/
// 根据商品的productid显示相应数据
let getDetailData = (id) =>{
  let url = '/piluwavue/detail';
  return axios.post(url,{productId:id})
}
/******************* 购物车 *************************/
// 加入购物车
let addCart = ({token,productId,count,standard})=>{
  let url = '/piluwavue/cart/add';
  return axios.post(url,{token,productId,count,standard})
} 
// 获取购物车列表
let getCartData = (token)=>{
  let url = '/piluwavue/cart/get';
  return axios.post(url,{token})
}
/******************* 我的 *************************/
// 登录发送验证码
let getCodeData = (phone)=>{
  let url = '/piluwavue/register/getCode';
  return axios.post(url,{phone:phone,templateId:537707})
} 
// 确认登录
let getLoginConfirm = ({phone,code})=>{
  let url= '/piluwavue/register';
  return axios.post(url,{phone,code})
}
// 通过token获取个人信息
let getUserInfosData = (token)=>{
  let url ='/piluwavue/userinfo/get';
  return axios.post(url,{token})
}
// 修改个人信息(昵称，性别)
let changeUserInfos = ({token,nickName,sex})=>{
  let url = '/piluwavue/userinfo/update';
  return axios.post(url,{token,nickName,sex})
}

export {
  getBannerData,
  getRecommendData,
  getClassifyData,
  getDetailData,
  getCodeData,
  getLoginConfirm,
  getUserInfosData,
  addCart,
  getCartData,
  changeUserInfos
}