<template>
  <div class='userInfo'>
    <!-- 标题 -->
    <van-nav-bar
      title="会员资料"
      right-text="···"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell is-link >头像</van-cell>
    <van-cell is-link @click="showPopup" title='昵称' :value='oldName'></van-cell>
    <van-cell is-link @click="showPopup" title='性别' :value='oldSex'></van-cell>
    <van-cell is-link>地址管理</van-cell>
    <van-popup v-model="show">
      <div class='nickName'>
        <span>请输入您要修改的昵称</span>
        <van-cell-group>
          <van-field label="原昵称：" :value="oldName" readonly />
          <van-field label="新昵称：" v-model="newName"  />
        </van-cell-group>
      </div>
      
      <div class='sex'>
        <span>修改性别</span>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1" checked-color="#eb8942">蔡徐坤</van-radio>
          <van-radio name="2" checked-color="#eb8942">乔碧萝</van-radio>
        </van-radio-group>
      </div>
      <van-button type="primary" size="large" color="#eb8942" @touchstart='changeInfos' closeable>确认修改</van-button>
    </van-popup>
  </div>
</template>

<script>
import { NavBar,Toast,Popup,Cell,Field,CellGroup,RadioGroup, Radio,Button } from 'vant';
import {getUserInfosData,changeUserInfos} from '../../api/index'
import {mapState,mapMutations} from 'vuex'

export default {
  components:{
    [NavBar.name]:NavBar,
    [Toast.name]:Toast,
    [Popup.name]:Popup,
    [Cell.name]:Cell,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
    [Button.name]:Button,
  },
  computed:{
    ...mapState({
      isLogin:state=>state.indexLogin.isLogin,
      userInfos:state=>state.indexLogin.userInfos,
      userToken:state=>state.indexLogin.userToken
    })
  },
  data(){
    return{
      show: false,
      oldName:'暂无昵称',
      newName:'',
      oldSex:'未知',
      newSex:'',
      radio:'0',
      infosList:[],
    }
  },
  methods:{
    // 点击确定按钮
    changeInfos(){
      let token = this.userToken
      let nickName = this.newName
      let sex = this.radio
      changeUserInfos({token,nickName,sex}).then((data)=>{
        // console.log(data)
      })
      // 提交结束的同时  newName重置
      this.newName=''
      // 再取一遍个人信息
      this.getUserCurrentInfo()
      // 关闭弹出层
      this.show=false

    },
    // 获取个人信息 并且渲染
    getUserCurrentInfo(){
      if(this.isLogin){
      getUserInfosData(this.userToken).then((data)=>{
        // console.log(data)
        // 取到性别
        if(data.result.sex===1){
          this.oldSex='男'
          this.radio='1'
        }else if(data.result.sex===2){
          this.oldSex='女'
          this.radio='2'
        }
        // 取到昵称
        this.oldName=data.result.nickName
        this.newName=data.result.nickName
      })
    }
    },
    // 是否弹出 弹出层
    showPopup() {
      this.show = true;
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      Toast('这是会员页面');
    }
  },
  mounted(){
    // 页面生成时就取一遍个人信息
    this.getUserCurrentInfo()
    
  }
}
</script>

<style lang='less' scoped>
@import '../../css/index.less';
.userInfo {
  width:100%;
  height:100vh;
  position: fixed;
  top:0;
  left:0;
  background: #f4f4f4;
  z-index:3;
  .van-cell{
    width:100%;
    height: 1.2rem;
    font-size:0.3rem;
    line-height: 0.8rem;
    .van-icon{
      margin-top:0.2rem;
    }
  }
  .van-popup{
    width:75%;
    height:50%;
  }
  .van-button--large{
    position:fixed;
    bottom: 0;
    left:0;
  }
}
</style>