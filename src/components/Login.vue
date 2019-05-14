<template>
  <el-form  class="login-container" label-position="right" label-width="70px" :rules="rules" ref="ruleForm" :model="ruleForm">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account" label="账号">
      <el-input type="text" v-model="ruleForm.account" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="psd" label="密码">
      <el-input type="password" v-model="ruleForm.psd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="code" label="验证码">
      <el-input type="text" v-model="ruleForm.code">
        <template slot="append">
          <el-button type="primary" @click="getCodeInfo" v-if="!isSendCode">获取验证码</el-button>
          <el-button type="primary" v-else>验证码已发送</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetCode, Login } from '../api/api';

export default {
  data() {
    return {
      logining: false,
      isSendCode: false,
      ruleForm: {
        account: 'admin',
        psd: '888888',
        code: '',
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' },],
        psd: [{ required: true, message: '请输入密码', trigger: 'blur' },],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' },]
      }
    };
  },
  methods: {
    getCodeInfo: function(){
      GetCode({ "account": this.ruleForm.account }).then(res => {
        if(res.data.result == 0){
          this.isSendCode = true
        }else{
          this.$alert('发送验证码失败，错误原因：'+res.data.message);
        }
      })
    },
    login: function(){
      let that = this;
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          let param = {
            account: that.ruleForm.account,
            pass: that.ruleForm.psd,
            code: that.ruleForm.code
          }
          Login(param).then(res => {
            if (res.data.result == 0) {
              let userInfo = {
                'cnckey': res.data.cnckey,
                'userName': res.data.adm_name
              }
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              // 存储全局变量的userInfo
              this.$store.dispatch('user/setUserInfo', userInfo)
              // console.log(this.$store.state.user);
              that.$router.push('/shopIndex');
            } else {
              that.$alert('登录失败，错误原因：'+ res.data.message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    // console.log(userInfo);
    if (userInfo && userInfo.length > 0){
      this.$router.push({ path: "/shopIndex" });
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
