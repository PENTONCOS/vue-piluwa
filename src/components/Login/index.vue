<template>
  <div class='login'>
    <!-- 标题 -->
    <van-nav-bar
      title="登录"
      right-text="···"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 登录模块 -->
    <van-form @submit="onSubmit">
      <!-- 手机号 -->
      <van-field
        v-model="phone"
        required
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      
      <van-field
        v-model="code"
        required
        center
        clearable
        name="短信验证码"
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
      <!-- <div class='send_code' slot="button" size="small" @click='toggleSend' ref='send_code' >{{countdown}}</div> -->
      <van-button slot="button" size="small" type="primary" @click='toggleSend' ref='send_code'>{{countdown}}</van-button>
      </van-field>
        
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" style="background:#ee7562;border:1px solid #ee7562;">
          登录
        </van-button>
      </div>
</van-form>
  </div>
</template>

<script>
import { NavBar,Toast,Form ,Button,Field,CellGroup,CountDown } from 'vant';
import {getCodeData,getLoginConfirm} from '../../api/index'
import {mapActions, mapMutations} from 'vuex'

export default {
  components:{
    [NavBar.name]:NavBar,
    [Toast.name]:Toast,
    [Form.name]:Form,
    [Button.name]:Button,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup, 
    [CountDown.name]:CountDown 
  },
  data(){
    return{
      phone: '',
      code:'',
      countdown:'发送验证码',
      time:30, //限制为30s
      send:true,
      Timer:null
    }
  },
  methods:{
    ...mapMutations(['indexLogin/changeIsLogin','indexLogin/storeUserInfos','indexLogin/storeUserToken']),
    // 限制发送验证码的频率
    toggleSend(){
      // 当发送请求为真时触发
      if(this.send){
        getCodeData(this.phone).then((data)=>{
          // console.log(data)
          if(data.status==0){
            this.coutdown='发送成功'
          }
        })
        this.send=!this.send
        clearInterval(this.Timer)
        this.Timer=setInterval(()=>{
          this.time--
          this.countdown=this.time;
          // 当time小于等于0 停掉计时器并且时间还原
          if(this.time<=0){
            clearInterval(this.Timer)
            this.send=!this.send
            this.time=30
            this.countdown='发送验证码'
          } 
        },1000)
      }
    },
    // 点击登录发送请求
    onSubmit(values) {
      let phone=this.phone
      let code=this.code
      getLoginConfirm({phone,code}).then((data)=>{
        // 登录成功时
        if(data.status==0){
          this.$router.push('/my')
          this['indexLogin/changeIsLogin'](true)
          this['indexLogin/storeUserInfos'](data)
          this['indexLogin/storeUserToken'](data.result.token)
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      Toast('这是登录页面');
    }
  },
  watch:{
  }
}

</script>

<style lang='less' scoped>
@import '../../css/index.less';

.login {
  width:100%;
  height:100vh;
  position: fixed;
  top:0;
  left:0;
  background: #f4f4f4;
  z-index:3;
}

</style>