<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="18">用户编号：{{dataList.usr_sqn}}</el-col>
      <el-col :span="6">注册时间：{{dataList.tme_register}}</el-col>
    </el-row>
    <el-row class="container">
      <el-col :span="20">
        <el-row>
          <el-col :span="8">手机号码：{{dataList.usr_mobile}}</el-col>
          <el-col :span="8">邀请码：{{dataList.ivt_number}}</el-col>
          <el-col :span="8">最新访问时间：{{dataList.newest_login_time}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">微信账号：{{dataList.wechat_account}}</el-col>
          <el-col :span="16">上级邀请人：{{dataList.parent_name?dataList.parent_name:'无'}}</el-col>
        </el-row>
        <el-col :span="24">邀请好友注册网址：{{dataList.url_vdr_ivt}}</el-col>
        <el-col :span="24">邀请店铺注册网址：{{dataList.url_shp_ivt}}</el-col>
      </el-col>
      <el-col :span="4" class="wxAvatar">
        <img :src="dataList.user_photo">
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { UserInfo } from '../../api/api'
export default {
  data() {
    return {
      dataList: [],
      sideBar: [],
    }
  },
  props: {
    usrSqn: {
      type: String
    }
  },
  methods: {
    getList: function() {
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "usr_sqn": this.usrSqn,
      }
      UserInfo(param).then(res => {
        if(res.data.result == 0){
          this.sideBar = res.data.count;
          this.dataList = res.data.base;
          this.$emit('sideBar', this.sideBar)
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    }
  },
  created() {
    this.getList();
  }
}
</script>

<style scoped lang="scss">
.container{
  font-size: 12px;
  padding-top: 20px;
  .el-row, .el-col{
    height: 40px;
  }
}
.wxAvatar{
  background: lightblue;
  width: 150px;
  height: 150px !important;
  img {
    width: 150px;
  }
}
</style>
